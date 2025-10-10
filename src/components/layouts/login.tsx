"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { BackgroundImage } from "@/components/ui/background-image";
import { BlurhashImage } from "@/components/ui/blurhash-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { sendVerificationCode, verifyEmailSign } from "@/lib/server-utils";

export const LoginLayout: React.FC<{ blurhash: string; backgroundImage: string }> = ({
	blurhash,
	backgroundImage,
}) => {
	const t = useTranslations();
	const [email, setEmail] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [step, setStep] = useState<"email" | "verify">("email");
	const [message, setMessage] = useState("");
	const [countdown, setCountdown] = useState(0);
	const [isPending, startTransition] = useTransition();

	// 背景状态管理
	const [backgroundLoaded, setBackgroundLoaded] = useState(false);
	const [showBlurhash, setShowBlurhash] = useState(false);

	// OAuth状态管理
	const [isHandlingOAuth, setIsHandlingOAuth] = useState(false);

	// 处理背景图片加载
	const handleBackgroundLoad = () => {
		setBackgroundLoaded(true);
		// 延迟显示blurhash，创建平滑过渡
		setTimeout(() => {
			setShowBlurhash(true);
		}, 500);
	};

	const handleSendCode = () => {
		if (!email) {
			setMessage(t("login.errors.empty_email"));
			return;
		}

		// 检验邮箱格式
		const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setMessage(t("login.errors.email_invalid"));
			return;
		}

		startTransition(async () => {
			const result = await sendVerificationCode(email, "login");
			if (result.success) {
				toast.success(t("friends.submit.toast.checkEmail"));
				setStep("verify");
				setMessage(t(result.message));
				setCountdown(60);

				const timer = setInterval(() => {
					setCountdown((prev) => {
						if (prev <= 1) {
							clearInterval(timer);
							return 0;
						}
						return prev - 1;
					});
				}, 1000);
			} else {
				setMessage(t("login.errors.send_code_failed"));
			}
		});
	};

	const handleLogin = () => {
		if (!verificationCode || verificationCode.length !== 6) {
			setMessage(t("login.errors.empty_code"));
			return;
		}

		startTransition(async () => {
			const result = await verifyEmailSign(email, verificationCode);
			setMessage(t(result.message));
			toast.success(t(result.message));

			if (result.success) {
				window.location.reload();
			}
		});
	};

	const handleOAuthLogin = async (provider: string) => {
		if (provider === "QQ") {
			const returnUrl = encodeURIComponent(window.location.origin + window.location.pathname);
			const state = `qq_oauth_${Date.now()}`;
			const authUrl = `https://api-space.tnxg.top/oauth/qq/authorize?redirect=true&return_url=${returnUrl}&state=${state}`;

			// 保存state用于验证
			localStorage.setItem("oauth_state", state);

			window.location.href = authUrl;
		} else {
			setMessage(t("login.errors.oauth_not_implemented", { provider }));
		}
	};

	// 处理验证码输入完成
	const handleOTPComplete = (value: string) => {
		setVerificationCode(value);
		// 如果输入完成6位数字，可以自动触发登录
		if (value.length === 6) {
			// 可选：自动登录
			// handleLogin();
		}
	};

	// 处理OAuth回调
	const handleOAuthCallback = useCallback(async (code: string, state: string) => {
		setIsHandlingOAuth(true);

		try {
			// 验证state
			const savedState = localStorage.getItem("oauth_state");
			if (!savedState || savedState !== state) {
				setMessage(t("login.errors.oauth_state_mismatch"));
				return;
			}

			// 使用临时代码获取用户信息
			const response = await fetch(`https://api-space.tnxg.top/api/user/info?code=${code}`);
			const data = await response.json();

			if (data.status === "success") {
				const userInfo = data.data;
				// 保存用户信息到localStorage
				localStorage.setItem("user", JSON.stringify(userInfo));

				// 清理OAuth状态
				localStorage.removeItem("oauth_state");

				// 提示登录成功
				toast.success(t("login.oauth.success"));

				// 重新加载页面或跳转
				window.location.reload();
			} else {
				setMessage(t("login.errors.oauth_get_user_failed", { error: data.message || "Unknown error" }));
			}
		} catch (error) {
			setMessage(t("login.errors.oauth_request_failed", { error: error instanceof Error ? error.message : "Network error" }));
		} finally {
			setIsHandlingOAuth(false);
		}
	}, [t]);

	// 初始化时检查OAuth回调
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const state = urlParams.get("state");
		const error = urlParams.get("error");

		if (error) {
			const errorDescription = urlParams.get("error_description") || error;
			// 使用 startTransition 来避免 ESLint 警告
			startTransition(() => {
				setMessage(t("login.errors.oauth_failed", { error: errorDescription }));
			});

			// 清理URL参数
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (code && state) {
			// 处理OAuth回调
			handleOAuthCallback(code, state);

			// 清理URL参数
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [t, handleOAuthCallback, startTransition]);

	return (
		<>
			<div className="inset-0 fixed z-0">
				<div
					className={`transition-all duration-1000 inset-0 absolute ${backgroundLoaded ? "blur-md opacity-30" : "blur-2xl opacity-100"
					}`}
				/>
				<BackgroundImage
					src={backgroundImage}
					className="h-full w-full inset-0 absolute object-cover"
					onLoad={handleBackgroundLoad}
				/>

				<div className="bg-black/20 inset-0 absolute" />
			</div>
			<div className="mx-auto max-w-md w-full relative z-10">
				<div className="transform transition-all duration-500 relative hover:scale-[1.02]">
					<div className="rounded-3xl inset-0 absolute overflow-hidden">
						<div
							className={`transition-all duration-1000 inset-0 absolute ${showBlurhash ? "opacity-100 scale-100" : "opacity-0 scale-110"
							}`}
						>
							<BlurhashImage
								hash={blurhash}
								width={400}
								height={600}
								className="h-full w-full object-cover"
							/>
						</div>

						<div
							className={`transition-all duration-1000 inset-0 absolute from-white/30 to-white/10 bg-gradient-to-br backdrop-blur-xl ${showBlurhash ? "opacity-0" : "opacity-100"
							}`}
						/>

						<div
							className={`bg-black/30 transition-all duration-1000 inset-0 absolute backdrop-blur-sm ${showBlurhash ? "opacity-100" : "opacity-0"
							}`}
						/>
					</div>

					<div className="bg-gradient-to-br rounded-3xl inset-0 absolute from-white/20 to-transparent via-white/5" />

					<div className="p-8 relative space-y-6">
						<div className="text-center space-y-2">
							<h1 className="text-3xl text-white font-bold drop-shadow-lg">{t("login.title")}</h1>
							<p className="text-sm text-white/80">{t("login.subtitle")}</p>
						</div>

						<div className="space-y-4">
							{step === "email"
								? (
										<>
											<div className="space-y-2">
												<Label htmlFor="email" className="text-white/90 font-medium">
													{t("login.email_label")}
												</Label>
												<div className="relative">
													<Input
														id="email"
														type="email"
														placeholder={t("login.email_placeholder")}
														value={email}
														onChange={e => setEmail(e.target.value)}
														disabled={isPending}
														className="text-white border-white/20 rounded-xl bg-white/10 h-12 transition-all duration-200 backdrop-blur-sm placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
													/>
												</div>
											</div>
											<Button
												onClick={handleSendCode}
												className="text-white font-medium border border-white/20 rounded-xl bg-white/20 h-12 w-full shadow-lg transition-all duration-200 backdrop-blur-sm hover:bg-white/30 hover:shadow-xl hover:scale-[1.02]"
												disabled={isPending}
											>
												<Icon icon="mingcute:mail-line" className="mr-2 h-4 w-4" />
												{isPending ? t("login.sending") : t("login.get_code")}
											</Button>
										</>
									)
								: (
										<>
											<div className="space-y-2">
												<Label htmlFor="email" className="text-white/90 font-medium">
													{t("login.email_label")}
												</Label>
												<Input
													id="email"
													type="email"
													value={email}
													disabled
													className="text-white/70 border-white/10 rounded-xl bg-white/5 h-12 backdrop-blur-sm"
												/>
											</div>
											<div className="space-y-3">
												<Label htmlFor="code" className="text-white/90 font-medium">
													{t("login.code_label")}
												</Label>
												<div className="flex justify-center">
													<InputOTP
														maxLength={6}
														value={verificationCode}
														onChange={handleOTPComplete}
														disabled={isPending}
													>
														<InputOTPGroup>
															<InputOTPSlot
																index={0}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
															<InputOTPSlot
																index={1}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
															<InputOTPSlot
																index={2}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
														</InputOTPGroup>
														<InputOTPSeparator className="text-white/40" />
														<InputOTPGroup>
															<InputOTPSlot
																index={3}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
															<InputOTPSlot
																index={4}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
															<InputOTPSlot
																index={5}
																className="text-lg text-white font-medium border-white/20 rounded-lg bg-white/10 h-12 w-12 transition-all duration-200 backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
															/>
														</InputOTPGroup>
													</InputOTP>
												</div>
											</div>
											<div className="pt-3 flex gap-3">
												<Button
													onClick={handleLogin}
													className="text-white font-medium border border-white/20 rounded-xl bg-white/20 flex-1 h-12 shadow-lg transition-all duration-200 backdrop-blur-sm hover:bg-white/30 hover:shadow-xl hover:scale-[1.02]"
													disabled={isPending || verificationCode.length !== 6}
												>
													{isPending ? t("login.verifying") : t("login.login_btn")}
												</Button>
												<Button
													variant="outline"
													onClick={handleSendCode}
													disabled={isPending || countdown > 0}
													className="text-white/90 border-white/20 rounded-xl bg-white/10 flex-1 h-12 transition-all duration-200 backdrop-blur-sm hover:text-white hover:bg-white/20 hover:scale-[1.02]"
												>
													{countdown > 0 ? t("login.resend_with_countdown", { s: countdown }) : t("login.resend")}
												</Button>
											</div>
											<Button
												variant="ghost"
												onClick={() => {
													setStep("email");
													setVerificationCode(""); // 清空验证码
												}}
												className="text-white/70 rounded-xl h-10 w-full transition-all duration-200 hover:text-white hover:bg-white/10"
											>
												←
												{" "}
												{t("login.back_to_email")}
											</Button>
										</>
									)}

							{message && (
								<div
									className={`text-sm p-3 text-center border rounded-xl transition-all duration-300 backdrop-blur-sm ${message.includes("success") || message.includes("sent")
										? "text-green-200 bg-green-500/20 border-green-400/30"
										: "text-red-200 bg-red-500/20 border-red-400/30"
									}`}
								>
									{message}
								</div>
							)}

							<div className="my-6 relative">
								<Separator className="bg-white/20" />
								<div className="flex items-center inset-0 justify-center absolute">
									<span className="bg-gradient-to-r text-xs text-white/60 font-medium px-4 uppercase from-transparent to-transparent backdrop-blur-sm">
										{t("login.or_continue_with")}
									</span>
								</div>
							</div>
							<div className="text-sm mx-auto py-5 flex h-5 w-fit items-center space-x-4">
								<Button
									variant="outline"
									onClick={() => handleOAuthLogin("Google")}
									disabled={isPending}
									className="text-white/90 border-white/20 rounded-xl bg-white/10 h-12 transition-all duration-200 backdrop-blur-sm hover:text-white hover:bg-white/20 hover:scale-[1.02]"
								>
									<Icon icon="mingcute:chrome-fill" className="mr-2 h-4 w-4" />
									{t("login.google")}
								</Button>
								<Separator orientation="vertical" className="bg-white/20" />
								<Button
									variant="outline"
									onClick={() => handleOAuthLogin("GitHub")}
									disabled={isPending}
									className="text-white/90 border-white/20 rounded-xl bg-white/10 h-12 transition-all duration-200 backdrop-blur-sm hover:text-white hover:bg-white/20 hover:scale-[1.02]"
								>
									<Icon icon="mingcute:github-fill" className="mr-2 h-4 w-4" />
									{t("login.github")}
								</Button>
								<Separator orientation="vertical" className="bg-white/20" />
								<Button
									variant="outline"
									onClick={() => handleOAuthLogin("QQ")}
									disabled={isPending || isHandlingOAuth}
									className="text-white/90 border-white/20 rounded-xl bg-white/10 h-12 transition-all duration-200 backdrop-blur-sm hover:text-white hover:bg-white/20 hover:scale-[1.02]"
								>
									<Icon icon="simple-icons:tencentqq" className="mr-2 h-4 w-4" />
									{isHandlingOAuth ? t("login.oauth.handling") : t("login.qq")}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginLayout;
