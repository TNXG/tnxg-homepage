"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { serverAction, verifyEmail } from "@/lib/server-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = (t: any) =>
	z.object({
		termsAgreed: z.boolean().refine(val => val === true, {
			message: t("friends.submit.validation.termsRequired"),
		}),
		email: z.string().email({ message: t("friends.submit.validation.emailValid") }),
		code: z.string().min(4, { message: t("friends.submit.validation.codeRequired") }),
		name: z.string().min(2, { message: t("friends.submit.validation.nameMin") }),
		url: z.string().url({ message: t("friends.submit.validation.urlValid") }),
		avatar: z.string().url({ message: t("friends.submit.validation.avatarValid") }),
		description: z.string().min(10, {
			message: t("friends.submit.validation.descriptionMin"),
		}),
		rssurl: z
			.string()
			.url({ message: t("friends.submit.validation.rssValid") })
			.optional()
			.or(z.literal("")),
		techstack: z.string().optional(),
	});

export function SubmitFriendForm() {
	const t = useTranslations();
	const [open, setOpen] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [verificationSent, setVerificationSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 4;

	const form = useForm({
		resolver: zodResolver(formSchema(t)),
		defaultValues: {
			termsAgreed: false,
			email: "",
			code: "",
			name: "",
			url: "",
			avatar: "",
			description: "",
			rssurl: "",
			techstack: "",
		},
		mode: "onSubmit",
	});

	const progress = (currentStep / totalSteps) * 100;
	const isLastStep = currentStep === totalSteps;
	const _isFirstStep = currentStep === 1;

	const goToNext = async () => {
		let isValid = true;

		if (currentStep === 1) {
			const termsAgreed = form.getValues("termsAgreed");
			if (!termsAgreed) {
				form.setError("termsAgreed", {
					message: t("friends.submit.validation.termsRequired"),
				});
				isValid = false;
			}
		} else if (currentStep === 2) {
			const email = form.getValues("email");
			const code = form.getValues("code");

			if (!email || !z.string().email().safeParse(email).success) {
				form.setError("email", {
					message: t("friends.submit.validation.emailValid"),
				});
				isValid = false;
			}

			if (!code || code.length < 4) {
				form.setError("code", {
					message: t("friends.submit.validation.codeRequired"),
				});
				isValid = false;
			}
		} else if (currentStep === 3) {
			const name = form.getValues("name");
			const url = form.getValues("url");
			const avatar = form.getValues("avatar");
			const description = form.getValues("description");

			if (!name || name.length < 2) {
				form.setError("name", {
					message: t("friends.submit.validation.nameMin"),
				});
				isValid = false;
			}

			if (!url || !z.string().url().safeParse(url).success) {
				form.setError("url", {
					message: t("friends.submit.validation.urlValid"),
				});
				isValid = false;
			}

			if (!avatar || !z.string().url().safeParse(avatar).success) {
				form.setError("avatar", {
					message: t("friends.submit.validation.avatarValid"),
				});
				isValid = false;
			}

			if (!description || description.length < 10) {
				form.setError("description", {
					message: t("friends.submit.validation.descriptionMin"),
				});
				isValid = false;
			}
		}

		if (isValid && currentStep < totalSteps) {
			setCurrentStep(prev => prev + 1);
			return true;
		}

		return false;
	};

	const goToPrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const sendVerificationCode = async () => {
		const email = form.getValues("email");

		if (!email || !z.string().email().safeParse(email).success) {
			form.setError("email", { message: t("friends.submit.validation.emailValid") });
			return;
		}

		setIsVerifying(true);

		try {
			const result = await verifyEmail(email);

			if (result.success) {
				setVerificationSent(true);
				toast({
					title: t("friends.submit.toast.verificationSent"),
					description: t("friends.submit.toast.checkEmail"),
				});
			} else {
				toast({
					title: t("friends.submit.toast.error"),
					description: result.message || t("friends.submit.toast.verificationFailed"),
					variant: "destructive",
				});
			}
		} catch {
			toast({
				title: t("friends.submit.toast.error"),
				description: t("friends.submit.toast.verificationFailed"),
				variant: "destructive",
			});
		} finally {
			setIsVerifying(false);
		}
	};

	const handleSubmit = async () => {
		const rssurl = form.getValues("rssurl");
		let isValid = true;

		if (rssurl && rssurl !== "" && !z.string().url().safeParse(rssurl).success) {
			form.setError("rssurl", {
				message: t("friends.submit.validation.rssValid"),
			});
			isValid = false;
			return;
		}

		if (!isValid) {
			return;
		}

		setIsSubmitting(true);

		try {
			const values = form.getValues();

			const techstackArray = values.techstack
				? values.techstack
						.split(",")
						.map(item => item.trim())
						.filter(Boolean)
				: [];

			const formData = new FormData();

			Object.entries(values).forEach(([key, value]) => {
				if (key === "techstack") {
					return;
				}

				if (key === "termsAgreed") {
					formData.append(key, value ? "on" : "off");
				} else {
					if (value !== undefined && value !== null) {
						formData.append(key, value.toString());
					}
				}
			});

			formData.append("techstack", JSON.stringify(techstackArray));

			const result = await serverAction(null, formData);

			if (result.success) {
				toast({
					title: t("friends.submit.toast.success"),
					description: t("friends.submit.toast.submitSuccess"),
				});
				form.reset();
				setOpen(false);
				setCurrentStep(1);
			} else {
				toast({
					title: t("friends.submit.toast.error"),
					description: result.message || t("friends.submit.toast.submitFailed"),
					variant: "destructive",
				});
			}
		} catch {
			toast({
				title: t("friends.submit.toast.error"),
				description: t("friends.submit.toast.submitFailed"),
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDialogClose = () => {
		setOpen(false);

		setTimeout(() => {
			form.reset();
			setVerificationSent(false);
			setCurrentStep(1);
		}, 300);
	};

	const stepFormElements: {
		[key: number]: React.JSX.Element;
	} = {
		1: (
			<div className="space-y-4">
				<div className="rounded-lg border p-4">
					<h3 className="mb-2 font-medium">{t("friends.submit.terms.title")}</h3>
					<p className="mb-4 text-sm text-muted-foreground">{t("friends.submit.terms.description")}</p>
					<Link href="/terms" className="inline-flex items-center text-sm text-primary hover:underline" target="_blank">
						{t("friends.submit.terms.readMore")}
						<Icon icon="mingcute:external-link-line" className="ml-1 size-3" />
					</Link>
				</div>

				<FormField
					control={form.control}
					name="termsAgreed"
					render={({ field }: { field: any }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>{t("friends.submit.terms.agree")}</FormLabel>
								<FormDescription>{t("friends.submit.terms.agreeDescription")}</FormDescription>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
			</div>
		),
		2: (
			<div className="space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.email")}</FormLabel>
							<div className="flex w-full gap-2">
								<FormControl>
									<Input placeholder={t("friends.submit.placeholder.email")} {...field} className="w-full" />
								</FormControl>
								<Button
									type="button"
									variant="outline"
									onClick={sendVerificationCode}
									disabled={isVerifying || verificationSent}
									className="whitespace-nowrap"
								>
									{isVerifying
										? (
												<Icon icon="mingcute:loading-line" className="size-4 animate-spin" />
											)
										: verificationSent
											? (
													t("friends.submit.form.sent")
												)
											: (
													t("friends.submit.form.verify")
												)}
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.code")}</FormLabel>
							<FormControl>
								<div className="flex w-full justify-center">
									<InputOTP maxLength={6} {...field} className="w-full">
										<InputOTPGroup>
											<InputOTPSlot index={0} className="size-10" />
											<InputOTPSlot index={1} className="size-10" />
											<InputOTPSlot index={2} className="size-10" />
											<InputOTPSlot index={3} className="size-10" />
											<InputOTPSlot index={4} className="size-10" />
											<InputOTPSlot index={5} className="size-10" />
										</InputOTPGroup>
									</InputOTP>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
		3: (
			<div className="space-y-5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.name")}</FormLabel>
							<FormControl>
								<Input placeholder={t("friends.submit.placeholder.name")} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.url")}</FormLabel>
							<FormControl>
								<Input placeholder={t("friends.submit.placeholder.url")} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="avatar"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.avatar")}</FormLabel>
							<FormControl>
								<Input placeholder={t("friends.submit.placeholder.avatar")} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>{t("friends.submit.form.description")}</FormLabel>
							<FormControl>
								<Textarea placeholder={t("friends.submit.placeholder.description")} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),

		4: (
			<div className="space-y-5">
				<div className="mb-4 rounded-lg border p-4">
					<h3 className="mb-2 font-medium">{t("friends.submit.optional.title") || "Optional Information"}</h3>
					<p className="text-sm text-muted-foreground">
						{t("friends.submit.optional.description")
							|| "These fields are optional but help us better understand your site."}
					</p>
				</div>

				<FormField
					control={form.control}
					name="rssurl"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>
								{t("friends.submit.form.rss")}
								{" "}
								(
								{t("friends.submit.form.optional")}
								)
							</FormLabel>
							<FormControl>
								<Input placeholder={t("friends.submit.placeholder.rss")} {...field} />
							</FormControl>
							<FormDescription>
								{t("friends.submit.form.rssHint") || "Add your RSS feed URL to share your latest content."}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="techstack"
					render={({ field }: { field: any }) => (
						<FormItem>
							<FormLabel>
								{t("friends.submit.form.techstack")}
								{" "}
								(
								{t("friends.submit.form.optional")}
								)
							</FormLabel>
							<FormControl>
								<Input placeholder={t("friends.submit.placeholder.techstack")} {...field} />
							</FormControl>
							<FormDescription>{t("friends.submit.form.techstackHint")}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		),
	};

	return (
		<>
			<Button className="mt-6 flex items-center gap-2" onClick={() => setOpen(true)}>
				<Icon icon="mingcute:add-line" className="size-4" />
				{t("friends.submit.button")}
			</Button>

			<Dialog open={open} onOpenChange={handleDialogClose}>
				<DialogContent className="w-full sm:max-w-[500px] md:max-w-[550px]">
					<DialogHeader>
						<DialogTitle>{t("friends.submit.title")}</DialogTitle>
						<DialogDescription>{t("friends.submit.description")}</DialogDescription>
					</DialogHeader>

					{/* Step indicator with progress bar */}
					<div className="mb-6 space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								{Array.from({ length: totalSteps }).map((_, index) => (
									<div
										key={index}
										className={`flex size-8 items-center justify-center rounded-full border text-xs font-medium ${currentStep > index + 1
											? "border-primary bg-primary text-primary-foreground"
											: currentStep === index + 1
												? "border-primary bg-primary/10 text-primary"
												: "border-muted-foreground/30 text-muted-foreground"
										}`}
									>
										{index + 1}
									</div>
								))}
							</div>
							<div className="text-sm text-muted-foreground">
								{t("friends.submit.step")}
								{" "}
								{currentStep}
								{" "}
								{t("friends.submit.of")}
								{" "}
								{totalSteps}
							</div>
						</div>
						<Progress value={progress} />
					</div>

					<Form {...form}>
						{/* Remove onSubmit to prevent automatic form submission */}
						<div className="space-y-5">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentStep}
									initial={{ opacity: 0, x: 15 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -15 }}
									transition={{ duration: 0.4, type: "spring" }}
								>
									{stepFormElements[currentStep]}
								</motion.div>
							</AnimatePresence>

							<DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:gap-0">
								<div className="flex gap-2">
									<Button type="button" variant="outline" onClick={handleDialogClose}>
										{t("friends.submit.form.cancel")}
									</Button>

									{currentStep > 1 && (
										<Button type="button" variant="outline" onClick={goToPrevious} className="flex items-center gap-1">
											<Icon icon="mingcute:arrow-left-line" className="size-4" />
											{t("friends.submit.form.back")}
										</Button>
									)}
								</div>

								{isLastStep
									? (
											<Button
												type="button"
												onClick={handleSubmit}
												disabled={isSubmitting}
												className="flex items-center gap-1"
											>
												{isSubmitting
													? (
															<>
																<Icon icon="mingcute:loading-line" className="mr-2 size-4 animate-spin" />
																{t("friends.submit.form.submitting")}
															</>
														)
													: (
															t("friends.submit.form.submit")
														)}
											</Button>
										)
									: (
											<Button type="button" onClick={goToNext} className="flex items-center gap-1">
												{t("friends.submit.form.next")}
												<Icon icon="mingcute:arrow-right-line" className="size-4" />
											</Button>
										)}
							</DialogFooter>
						</div>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
