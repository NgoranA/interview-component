'use client'

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface RecipientInputProps {
	recipients: string[];
	addRecipient: (email: string) => void;
	removeRecipient: (email: string) => void;
	recipientInputOpen: boolean;
	setRecipientInputOpen: (value: boolean) => void
}

function XIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

export default function RecipientInput({ recipients, addRecipient, removeRecipient, recipientInputOpen, setRecipientInputOpen }: RecipientInputProps) {


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
						<PopoverContent className=" max-w-md bg-graylight2 rounded-md p-4 border">
							<div className="space-y-2">
								<h3 className="text-sm">Add Recipient</h3>
								<div className="flex items-center gap-2">
									<Input
										id="to"
										className="flex-1 block shadow-sm sm:text-sm border-graylight6 rounded-md"
										placeholder="Enter email address"
										onKeyDown={(e: any) => {
											if (e.key === "Enter") {
												addRecipient(e.target.value)
												e.target.value = ""
											}
										}}
									/>
									<Button
										type="button"
										className="bg-linear-blue-from hover:bg-linear-blue-to"
										onClick={() => {
											const inputElement = document.getElementById("to") as HTMLInputElement;
											const email = inputElement.value
											if (email) {
												addRecipient(email)
												toast("Email added", { description: `Email ${email} has been added` })
											}
										}}
									>
										Add
									</Button>
								</div>
								<div className="grid gap-3 max-h-60 overflow-y-auto">
									{recipients.map((email, index) => (
										<Badge
											key={index}
											className=" rounded-md px-3 py-1 text-sm flex items-center justify-between text-graylight11 font-normal"
											variant="outline"
										>
											{email}
											<button
												type="button"
												className="ml-2 text-graylight6 hover:text-graylight11 "
												onClick={() => {
													removeRecipient(email);
													toast("Email removed", { description: `Email ${email} has been removed from the list` })
												}}
											>
												<XIcon className="w-4 h-4" />
											</button>
										</Badge>
									))}
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className="flex sm:justify-end md:col-span-2 h-26px ">
				<Button variant="ghost" className=" h-[26px] px-1.5 text-sm" size={"sm"}>
					Cc
				</Button>
				<Button variant="ghost" className="text-sm px-1.5 h-[26px]" size={"sm"}>
					Bcc
				</Button>
			</div>
		</div>
	)
}
