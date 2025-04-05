"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

// 为每个步骤创建单独的验证模式
const createStepSchemas = (t: any) => {
	const step1Schema = z.object({
		termsAgreed: z.boolean().refine((val) => val === true, {
			message: t("friends.submit.validation.termsRequired"),
		}),
	})

	const step2Schema = z.object({
		email: z.string().email({ message: t("friends.submit.validation.emailValid") }),
		code: z.string().min(6, { message: t("friends.submit.validation.codeRequired") }),
	})

	const step3Schema = z.object({
		name: z.string().min(2, { message: t("friends.submit.validation.nameMin") }),
		url: z.string().url({ message: t("friends.submit.validation.urlValid") }),
		avatar: z.string().url({ message: t("friends.submit.validation.avatarValid") }),
		description: z.string().min(5, { message: t("friends.submit.validation.descriptionMin") }),
	})

	const step4Schema = z.object({
		rssurl: z
			.string()
			.url({ message: t("friends.submit.validation.rssValid") })
			.optional()
			.or(z.literal("")),
		techstack: z.string().optional().or(z.literal("")),
	})

	// 完整的表单模式
	const fullSchema = z.object({
		name: z.string().min(2, { message: t("friends.submit.validation.nameMin") }),
		url: z.string().url({ message: t("friends.submit.validation.urlValid") }),
		avatar: z.string().url({ message: t("friends.submit.validation.avatarValid") }),
		description: z.string().min(5, { message: t("friends.submit.validation.descriptionMin") }),
		email: z.string().email({ message: t("friends.submit.validation.emailValid") }),
		code: z.string().min(6, { message: t("friends.submit.validation.codeRequired") }),
		rssurl: z
			.string()
			.url({ message: t("friends.submit.validation.rssValid") })
			.optional()
			.or(z.literal("")),
		techstack: z.string().optional().or(z.literal("")),
		termsAgreed: z.boolean().refine((val) => val === true, {
			message: t("friends.submit.validation.termsRequired"),
		}),
	})

	return {
		step1Schema,
		step2Schema,
		step3Schema,
		step4Schema,
		fullSchema,
	}
}

type FriendLinkFormValues = z.infer<ReturnType<typeof createStepSchemas>["fullSchema"]>

export function SubmitFriendForm() {
	const t = useTranslations()
	const [open, setOpen] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [verificationSent, setVerificationSent] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 4

	// 创建步骤模式
	const { step1Schema, step2Schema, step3Schema, step4Schema, fullSchema } = createStepSchemas(t)

	// 为每个步骤创建单独的表单实例
	const step1Form = useForm<z.infer<typeof step1Schema>>({
		resolver: zodResolver(step1Schema),
		defaultValues: {
			termsAgreed: false,
		},
	})

	const step2Form = useForm<z.infer<typeof step2Schema>>({
		resolver: zodResolver(step2Schema),
		defaultValues: {
			email: "",
			code: "",
		},
	})

	const step3Form = useForm<z.infer<typeof step3Schema>>({
		resolver: zodResolver(step3Schema),
		defaultValues: {
			name: "",
			url: "",
			avatar: "",
			description: "",
		},
	})

	const step4Form = useForm<z.infer<typeof step4Schema>>({
		resolver: zodResolver(step4Schema),
		defaultValues: {
			rssurl: "",
			techstack: "",
		},
	})

	// 主表单，用于最终提交
	const mainForm = useForm<FriendLinkFormValues>({
		resolver: zodResolver(fullSchema),
		defaultValues: {
			name: "",
			url: "",
			avatar: "",
			description: "",
			email: "",
			code: "",
			rssurl: "",
			techstack: "",
			termsAgreed: false,
		},
	})

	// 当步骤变化时，从主表单同步数据到当前步骤表单
	useEffect(() => {
		const mainValues = mainForm.getValues()

		if (currentStep === 1) {
			step1Form.setValue("termsAgreed", mainValues.termsAgreed)
			console.log("step1Form")
		} else if (currentStep === 2) {
			step2Form.setValue("email", mainValues.email)
			step2Form.setValue("code", mainValues.code)
			console.log("step2Form")
		} else if (currentStep === 3) {
			step3Form.setValue("name", mainValues.name)
			step3Form.setValue("url", mainValues.url)
			step3Form.setValue("avatar", mainValues.avatar)
			step3Form.setValue("description", mainValues.description)
			console.log("step3Form")
		} else if (currentStep === 4) {
			step4Form.setValue("rssurl", mainValues.rssurl || "")
			step4Form.setValue("techstack", mainValues.techstack || "")
			console.log("step4Form")
		}
	}, [currentStep, mainForm, step1Form, step2Form, step3Form, step4Form])

	const sendVerificationCode = async () => {
		const email = step2Form.getValues("email")

		if (!email || !z.string().email().safeParse(email).success) {
			step2Form.setError("email", { message: t("friends.submit.validation.emailValid") })
			return
		}

		setIsVerifying(true)

		try {
			const response = await fetch("/links/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (data.status === "success") {
				setVerificationSent(true)
				toast({
					title: t("friends.submit.toast.verificationSent"),
					description: t("friends.submit.toast.checkEmail"),
				})

				// 更新主表单中的email
				mainForm.setValue("email", email)
			} else {
				toast({
					title: t("friends.submit.toast.error"),
					description: data.message || t("friends.submit.toast.verificationFailed"),
					variant: "destructive",
				})
			}
		} catch {
			toast({
				title: t("friends.submit.toast.error"),
				description: t("friends.submit.toast.verificationFailed"),
				variant: "destructive",
			})
		} finally {
			setIsVerifying(false)
		}
	}

	// 处理步骤表单提交
	const handleStepSubmit = async (step: number, data: any) => {
		// 更新主表单中的数据
		Object.keys(data).forEach((key) => {
			mainForm.setValue(key as any, data[key])
		})

		if (step < totalSteps) {
			setCurrentStep(step + 1)
		} else {
			// 最后一步，提交整个表单
			await submitForm(mainForm.getValues())
		}
	}

	const submitForm = async (values: FriendLinkFormValues) => {
		setIsSubmitting(true)

		// 转换逗号分隔的技术栈为数组
		const techstackArray = values.techstack
			? values.techstack
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean)
			: []

		try {
			const response = await fetch("/links/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					techstack: techstackArray,
				}),
			})

			const data = await response.json()

			if (data.status === "success") {
				toast({
					title: t("friends.submit.toast.success"),
					description: t("friends.submit.toast.submitSuccess"),
				})

				// 重置所有表单
				mainForm.reset()
				step1Form.reset()
				step2Form.reset()
				step3Form.reset()
				step4Form.reset()

				setOpen(false)
				setVerificationSent(false)
				setCurrentStep(1)
			} else {
				toast({
					title: t("friends.submit.toast.error"),
					description: data.message || t("friends.submit.toast.submitFailed"),
					variant: "destructive",
				})
			}
		} catch {
			toast({
				title: t("friends.submit.toast.error"),
				description: t("friends.submit.toast.submitFailed"),
				variant: "destructive",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const goToPreviousStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1))
	}

	const handleDialogClose = () => {
		setOpen(false)
		// 重置所有状态
		setTimeout(() => {
			setCurrentStep(1)
			setVerificationSent(false)

			// 重置所有表单
			mainForm.reset()
			step1Form.reset()
			step2Form.reset()
			step3Form.reset()
			step4Form.reset()
		}, 300)
	}

	// 获取当前步骤的表单
	const getCurrentForm = () => {
		switch (currentStep) {
			case 1:
				return step1Form
			case 2:
				return step2Form
			case 3:
				return step3Form
			case 4:
				return step4Form
			default:
				return step1Form
		}
	}

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="space-y-4">
						<div className="rounded-lg border p-4">
							<h3 className="mb-2 font-medium">{t("friends.submit.terms.title")}</h3>
							<p className="mb-4 text-sm text-muted-foreground">{t("friends.submit.terms.description")}</p>
							<Link
								href="/terms"
								className="inline-flex items-center text-sm text-primary hover:underline"
								target="_blank"
							>
								{t("friends.submit.terms.readMore")}
								<Icon icon="mingcute:external-link-line" className="ml-1 size-3" />
							</Link>
						</div>

						<FormField
							control={step1Form.control}
							name="termsAgreed"
							render={({ field }) => (
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
				)
			case 2:
				return (
					<div className="space-y-5">
						<FormField
							control={step2Form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.email")}</FormLabel>
									<div className="flex w-full flex-col gap-2 sm:flex-row">
										<FormControl>
											<Input
												placeholder={t("friends.submit.placeholder.email")}
												className="w-full"
												autoComplete="email"
												id="friend-email-field"
												{...field.ref}
											/>
										</FormControl>
										<Button
											type="button"
											variant="outline"
											onClick={sendVerificationCode}
											disabled={isVerifying || verificationSent}
											className="whitespace-nowrap"
										>
											{isVerifying ? (
												<Icon icon="mingcute:loading-line" className="size-4 animate-spin" />
											) : verificationSent ? (
												t("friends.submit.form.sent")
											) : (
												t("friends.submit.form.verify")
											)}
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={step2Form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.code")}</FormLabel>
									<FormControl>
										<div className="flex w-full justify-center">
											<InputOTP
												maxLength={6}
												className="w-full"
												ref={field.ref}
											>
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
				)
			case 3:
				return (
					<div className="space-y-5">
						<FormField
							control={step3Form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.name")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("friends.submit.placeholder.name")}
											autoComplete="off"
											id="friend-name-field"
											{...field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={step3Form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.url")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("friends.submit.placeholder.url")}
											autoComplete="off"
											id="friend-url-field"
											{...field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={step3Form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.avatar")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("friends.submit.placeholder.avatar")}
											autoComplete="off"
											id="friend-avatar-field"
											{...field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={step3Form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("friends.submit.form.description")}</FormLabel>
									<FormControl>
										<Textarea
											placeholder={t("friends.submit.placeholder.description")}
											autoComplete="off"
											id="friend-description-field"
											{...field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)
			case 4:
				return (
					<div className="space-y-5">
						<div className="rounded-lg border p-4 bg-muted/30">
							<h3 className="mb-2 font-medium">{t("friends.submit.form.optionalFields")}</h3>
							<p className="text-sm text-muted-foreground">{t("friends.submit.form.optionalDescription")}</p>
						</div>

						<FormField
							control={step4Form.control}
							name="rssurl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("friends.submit.form.rss")} ({t("friends.submit.form.optional")})
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t("friends.submit.placeholder.rss")}
											autoComplete="off"
											id="friend-rss-field"
											{...field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={step4Form.control}
							name="techstack"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("friends.submit.form.techstack")} ({t("friends.submit.form.optional")})
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t("friends.submit.placeholder.techstack")}
											autoComplete="off"
											id="friend-techstack-field"
											{...field.ref}
										/>
									</FormControl>
									<FormDescription>{t("friends.submit.form.techstackHint")}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)
			default:
				return null
		}
	}

	const renderStepIndicator = () => {
		return (
			<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="flex items-center space-x-2">
					{Array.from({ length: totalSteps }).map((_, index) => (
						<div
							key={index}
							className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border text-xs font-medium ${currentStep > index + 1
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
					{t("friends.submit.step")} {currentStep} {t("friends.submit.of")} {totalSteps}
				</div>
			</div>
		)
	}

	return (
		<>
			<Button className="mt-6 flex items-center gap-2" onClick={() => setOpen(true)}>
				<Icon icon="mingcute:add-line" className="size-4" />
				{t("friends.submit.button")}
			</Button>

			<Dialog open={open} onOpenChange={handleDialogClose}>
				<DialogContent className="w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 sm:max-w-[500px] md:max-w-[550px]">
					<DialogHeader>
						<DialogTitle>{t("friends.submit.title")}</DialogTitle>
						<DialogDescription>{t("friends.submit.description")}</DialogDescription>
					</DialogHeader>

					{renderStepIndicator()}
					<Form {...getCurrentForm()}>
						<form
							onSubmit={getCurrentForm().handleSubmit((data) => handleStepSubmit(currentStep, data))}
							className="space-y-5"
						>
							{renderStepContent()}

							<DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:gap-0 mt-6">
								<div className="flex gap-2">
									<Button type="button" variant="outline" onClick={handleDialogClose}>
										{t("friends.submit.form.cancel")}
									</Button>

									{currentStep > 1 && (
										<Button
											type="button"
											variant="outline"
											onClick={goToPreviousStep}
											className="flex items-center gap-1"
										>
											<Icon icon="mingcute:arrow-left-line" className="size-4" />
											{t("friends.submit.form.back")}
										</Button>
									)}
								</div>

								<Button type="submit" disabled={isSubmitting} className="flex items-center gap-1">
									{isSubmitting ? (
										<>
											<Icon icon="mingcute:loading-line" className="mr-2 size-4 animate-spin" />
											{t("friends.submit.form.submitting")}
										</>
									) : currentStep < totalSteps ? (
										<>
											{t("friends.submit.form.next")}
											<Icon icon="mingcute:arrow-right-line" className="size-4" />
										</>
									) : (
										t("friends.submit.form.submit")
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

