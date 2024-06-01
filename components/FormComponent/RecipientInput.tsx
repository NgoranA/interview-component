'use client'
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { toast } from "sonner";

import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipientInputProps {
	recipients: { email: string, id: number }[];
	addRecipient: (value: { email: string, id: number }) => void;
	removeRecipient: (value: { email: string, id: number }) => void;
	recipientInputOpen: boolean;
	setRecipientInputOpen: (value: boolean) => void
	toggleCC: number;
	setToggleCC: (value: number) => void;
}




export default function RecipientInput({ toggleCC, setToggleCC, recipients, addRecipient, removeRecipient, recipientInputOpen, setRecipientInputOpen }: RecipientInputProps) {


	return (

		<div className="grid  sm:grid-cols-4 items-center justify-between gap-3 ">
			<label htmlFor="to" className="sm:col-span-1">
				To
			</label>
			<div className="col-span-1">
				<div className="">
					<Popover open={recipientInputOpen} onOpenChange={setRecipientInputOpen}>
						<PopoverTrigger asChild className="h-[24px]">
							<Button variant="ghost" className="flex items-center justify-between px-1.5 py-0.5 rounded-md text-sm font-normal">
								<span> {recipients.length > 0 ? recipients.length : 128} individual recipients</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-md p-0 text-graylight6 shadow-custom">
							<Command shouldFilter={false}>
								<CommandInput
									onKeyDown={(e: any) => {
										if (e.key === "Enter") {
											addRecipient({ email: e.target.value, id: recipients.length + 1 })
											e.target.value = ""
										}
									}}
									placeholder="Type the email and press Enter" />
								<CommandList>
									<CommandGroup>
										{recipients.map((recipient, idx) => (
											<CommandItem
												key={idx}
												value={recipient.email}
												className="flex justify-between group text-graylight11 hover:cursor-pointer "
											>
												{recipient.email}
												<X
													size={17}
													className="group-hover:text-graylight11 text-graylight2"
													onClick={() => {
														removeRecipient(recipient);
														toast("Email removed", { description: `Email ${recipient.email} has been removed from the list` })
													}}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className="flex sm:justify-end md:col-span-2 h-26px ">
				<Button onClick={() => setToggleCC(1)} variant="ghost" className={cn(`h-[26px] px-1.5 text-sm`, toggleCC === 1 ? "bg-graylight6" : "bg-inherit")} size={"sm"}>
					Cc
				</Button>
				<Button onClick={() => setToggleCC(2)} variant="ghost" className={cn("text-sm px-1.5 h-[26px] ", toggleCC === 2 ? "bg-graylight6" : "bg-inherit")} size={"sm"}>
					Bcc
				</Button>
			</div>
		</div >
	)
}
