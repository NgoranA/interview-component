"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RecipientInput from "./RecipientInput";

import emails from "@/lib/emails";
import { toast } from "sonner";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";


type Sender = {
	email: string,
	name: string
}
const senders: Sender[] = [
	{ email: "alice@example.com", name: "Alice Johnson" },
	{ email: "bob@example.com", name: "Bob Smith" },
	{ email: "carol@example.com", name: "Carol Davis" },
	{ email: "dave@example.com", name: "Dave Wilson" },
	{ email: "eve@example.com", name: "Eve Clark" },
	{ email: "frank@example.com", name: "Frank Miller" },
	{ email: "grace@example.com", name: "Grace Lee" },
	{ email: "henry@example.com", name: "Henry Young" },
	{ email: "irene@example.com", name: "Irene Walker" },
	{ email: "jack@example.com", name: "Jack Hall" },
];

export default function EmailForm() {

	const [selectedSender, setSelectedSender] = useState<Sender | null>(null);
	const [recipients, setRecipients] = useState<any[]>(emails);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [recipientInputOpen, setRecipientInputOpen] = useState<boolean>(false)
	const [openSelectUser, setOpenSelectUser] = useState<boolean>(false)
	const [toggleCC, setToggleCC] = useState<number>(1)


	const addRecipient = (recipient: { email: string, id: number }) => {

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (emailRegex.test(recipient.email)) {
			if (!recipients.includes(recipient.email)) {
				setRecipients([...recipients, recipient.email])
				setRecipientInputOpen(false)
			} else {
				toast("Duplicate", { description: `The email ${recipient.email} already exists in this list` })
			}
		} else {
			toast("Email Error", {
				duration: 3000,
				description: "Email is not a valid email"
			})
		}
	}

	const removeRecipient = (recipient: { email: string, id: number }) => {
		setRecipients(recipients.filter((r) => r.email !== recipient.email));
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
			setSelectedSender(null)
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
					<Popover open={openSelectUser} onOpenChange={setOpenSelectUser}>
						<PopoverTrigger asChild>
							<Button variant="ghost" className="w-full px-1.5 py-0.5 bg-inherit justify-start gap-[6px]">
								<Plus className="h-4 w-4" />{selectedSender ? <>{selectedSender.name}</> : <>  Set status</>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0" align="start">
							<StatusList setOpen={setOpenSelectUser} setSelectedSender={setSelectedSender} />
						</PopoverContent>
					</Popover>
				</div>

				<RecipientInput setRecipientInputOpen={setRecipientInputOpen} toggleCC={toggleCC} setToggleCC={setToggleCC} recipientInputOpen={recipientInputOpen} recipients={recipients} addRecipient={addRecipient} removeRecipient={removeRecipient} />

				<div className="items-center grid grid-cols-4 gap-3">
					<label htmlFor="subject" className="text-sm col-span-1 font-medium">
						Subject
					</label>
					<Input
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder="Email Subject..." id="subject" className=" h-7 hover:bg-white bg-inherit outline-none col-span-3" />
				</div>
				<hr className="border-t-graylight6" />
				<div className="w-full h-full">
					<label htmlFor="message" className="sr-only">
						Message
					</label>
					<Textarea
						id="message"
						placeholder="Mention fields with '@' and write your message"
						className="resize-none outline-none overflow-hidden bg-white w-full p-3 rounded-xl focus:outline-none shadow-sm"
						rows={14}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<Button onClick={handleToast} className="rounded-lg focus:ring-0 justify-self-end w-full sm:w-[3.625rem] sm:h-[2.125rem] bg-gradient-to-r from-linear-blue-from  to-linear-blue-to flex gap-3 px-1.5 py-0.5">Send</Button>
			</div>
		</div>
	)
}
function StatusList({
	setOpen,
	setSelectedSender,
}: {
	setOpen: (open: boolean) => void
	setSelectedSender: (sender: Sender | null) => void
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{senders.map((sender, idx) => (
						<CommandItem
							key={idx}
							value={sender.email}
							onSelect={(sender) => {
								setSelectedSender(
									senders.find((priority) => priority.email === sender) || null
								)
								setOpen(false)
							}}
						>
							{sender.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
