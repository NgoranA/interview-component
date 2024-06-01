"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AudioLines, CommandIcon, FolderSearch, GanttChart, Plus, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import people from "@/lib/persons";
import companies from "@/lib/companies";
import ItemComponent from "./CustomListComponent";




export default function AdvancedComponent() {
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className=" text-graylight11 w-full max-w-[720px] p-3 bg-graylight2 border-graylight6 border rounded-xl shadow-custom backdrop-blur-md flex flex-col gap-3 ">
			<div className="relative w-full border-0 flex items-center">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<SearchIcon className="w-4 h-4 text-graylight11" />
				</div>
				<Input
					type="search"
					placeholder="Search for anything..."
					className="block w-full p-5 pl-10 text-sm text-graylight11 shadow-custom rounded-md bg-white"
				/>
				<Button type="button" variant={"ghost"} className="absolute inset-y-0 text-graylight11 gap-2 right-0 bottom-1 flex items-center pr-3">
					<CommandIcon className="w-4 h-4 text-graylight11" /> K
				</Button>
			</div>
			<hr className="border-t-graylight6" />
			<Card className="p-3 flex flex-col gap-3 text-graylight11 shadow-custom border-0">
				<Label className="block font-normal mb-2">Search people</Label>
				<CardContent className="p-0">
					{people.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person => (
						<ItemComponent key={person.id} item={person} />
					))}
				</CardContent>
			</Card>
			<Card className="p-3 flex flex-col gap-3 text-graylight11 border-0 shadow-custom">
				<Label className="block font-normal mb-2">Search companies</Label>
				<CardContent className="p-0">
					{companies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase())).map(company => (
						<ItemComponent item={company} key={company.id} />
					))}
				</CardContent>
			</Card>
			<div className="flex gap-1 items-center justify-end">
				<Button className="hover:bg-graylight6 flex gap-2 px-1.5" variant={"ghost"}> <GanttChart className="h-4 w-4" /> Go to agents</Button>
				<Button className="hover:bg-graylight6 flex gap-2 px-1.5" variant={"ghost"}><FolderSearch className="h-4 w-4" /> Search new leads</Button>
				<Button className="hover:bg-graylight6 flex gap-2 px-1.5" variant={"ghost"}> <AudioLines className="h-4 w-4" /> Analaytics </Button>
				<Button className="bg-gradient-to-r from-linear-blue-from px-1.5 flex gap-2 to-linear-blue-to text-white" ><Plus className="h-4 w-4 text-white" />New message</Button>

			</div>
		</div>
	);
}


