import { FC, SVGProps } from "react";
import { Item, Person } from "./customtypes";
import { ArrowUpRight, Building2, Globe, Mail, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ItemProps {
	item: Item;
}


const LinkedIn = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>;

const isPerson = (item: Item): item is Person => 'email' in item;

const ItemComponent: FC<ItemProps> = ({ item }) => (
	<li key={item.id} className="flex items-center w-full group">
		<div className="flex gap-3 text-graylight11 items-center w-full hover:bg-graylight2 p-2 relative justify-start rounded-md">
			<div className="h-7 bg-graylight2 border border-graylight6 rounded-full w-7 flex items-center justify-center">
				{isPerson(item) ? <Users className="h-4 w-4 text-graylight11" /> : <Building2 className="h-4 w-4 text-graylight11" />}
			</div>
			<p className="font-medium flex items-center gap-3">{item.name}</p>
			<Link target="_blank" href={item.linkedinUrl}>
				<Badge className="bg-[#EDF6FF] text-[#006ADC] flex gap-1 rounded-md text-sm border-[#B7D9F8] font-normal py-0 group-hover:bg-[#EDF6FF]">
					<LinkedIn className="h-3 w-3" /> {item.lnusername}
				</Badge>
			</Link>
			{isPerson(item) ? (
				<Badge className="bg-graylight2 border-graylight6 text-graylight11 hover:bg-graylight6 flex items-center gap-1 rounded-md font-normal">
					<Mail className="h-3 w-3" /> {item.email}
				</Badge>
			) : (
				<Link target="_blank" href={item.website} className="text-gray-500">
					<Badge className="flex py-0 gap-1 bg-[#F0F4FF] border-[#C6D4F9] text-[#3451B2] rounded-md text-sm font-normal">
						<Globe className="h-3 w-3" /> {item.website}
					</Badge>
				</Link>
			)}
			<ArrowUpRight className="h-4 w-4 text-white group-hover:text-graylight11 absolute right-0 mr-3" />
		</div>
	</li>
);


export default ItemComponent
