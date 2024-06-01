"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RecipientInput from "./RecipientInput";
import emails from "@/lib/emails";
import { toast } from "sonner";

export default function EmailForm() {
	const [selectedSender, setSelectedSender] = useState<string | undefined>(undefined);
	const [recipients, setRecipients] = useState<any[]>(emails);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [recipientInputOpen, setRecipientInputOpen] = useState(false)

	const addRecipient = (email: any) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (emailRegex.test(email)) {
			if (!recipients.includes(email)) {
				setRecipients([...recipients, email])
				setRecipientInputOpen(false)
			} else {
				toast("Duplicate", { description: `The email ${email} already exists in this list` })
			}
		} else {
			toast("Email Error", {
				duration: 3000,
				description: "Email is not a valid email"
			})
		}
	}

	const removeRecipient = (email: any) => {
		setRecipients(recipients.filter((r) => r !== email));
	};

	const handleToast = () => {
		if (!message || !selectedSender || !subject || recipients.length === 0) {
			toast("Validation Error", {
				description: "All fields are compulsary"
			})
		} else {
			setRecipients([]),
				setMessage(""),
				setSubject("")
			setSelectedSender(undefined)
			toast("Email Sent", {
				description: "Email sent successfully",
				duration: 3000
			})
		}
	}

	return (
		<div className="w-full max-w-[720px] md:max-h-[557px] p-3 bg-graylight2 border-graylight6 border rounded-xl shadow-custom backdrop-blur-md ">
			<div className="grid gap-3">
				<div className="grid grid-cols-4 items-center gap-3 py-0.5">
					<label htmlFor="from" className="text-sm font-medium col-span-1">
						From
					</label>
					<Select
						value={selectedSender}
						onValueChange={setSelectedSender}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select sender" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="ngoranaristide@gmail.com">Ngoran Aristide</SelectItem>
								<SelectItem value="speedarisbuzz.sa@gmail.com">Speedy Aristotle</SelectItem>
								<SelectItem value="n.arise442@gmail.com">Arc Arise</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<RecipientInput setRecipientInputOpen={setRecipientInputOpen} recipientInputOpen={recipientInputOpen} recipients={recipients} addRecipient={addRecipient} removeRecipient={removeRecipient} />
				<div className="items-center grid grid-cols-4 gap-3">
					<label htmlFor="subject" className="text-sm col-span-1 font-medium">
						Subject
					</label>
					<Input
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder="Email Subject..." id="subject" className=" h-[26px] border-0 hover:bg-white bg-inherit outline-0 col-span-3" />
				</div>
				<hr className="border-t-graylight6" />
				<div className="w-full h-full">
					<label htmlFor="message" className="sr-only">
						Message
					</label>
					<Textarea
						id="message"
						placeholder="Mention fields with '@' and write your message"
						className="resize-none focus:ring-0 focus:border overflow-hidden bg-white w-full p-3 rounded-xl border-0 shadow-sm"
						rows={14}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<Button onClick={handleToast} className="rounded-lg justify-self-end w-full sm:w-[3.625rem] sm:h-[2.125rem] bg-gradient-to-r from-linear-blue-from  to-linear-blue-to flex gap-3 px-1.5 py-0.5">Send</Button>
			</div>
		</div>
	)
}
