import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen text-graylight11 bg-white font-medium items-center justify-center text-sm">
      <div className="w-full max-w-[720px] mx-h-[557px] p-3 bg-graylight2 border-graylight6 border rounded-xl shadow-lg backdrop-blur-md ">
        <div className="grid gap-3">
          <div className="grid grid-cols-4 items-center gap-3">
            <label htmlFor="from" className="text-sm font-medium col-span-1">
              From
            </label>
            <Button variant="ghost" className="py-0.5 px-1.5 flex gap-[6px] justify-self-start rounded-lg"> <Plus size={16} /> Select sender</Button>
          </div>
          <div className="grid grid-cols-2 justify-between">
            <div className="grid grid-cols-2 items-center justify-between gap-3 ">
              <label htmlFor="to" className="">
                To
              </label>
              <Button variant="ghost" id="to" className="px-1.5 py-0.5 flex rounded-lg"> 128 individual recipients</Button>
            </div>
            <div className="flex justify-end ">
              <Button variant="ghost" className=" px-1.5 text-sm" size={"sm"}>
                Cc
              </Button>
              <Button variant="ghost" className="text-sm px-1.5" size={"sm"}>
                Bcc
              </Button>
            </div>
          </div>
          <div className="items-center grid grid-cols-4 gap-3">
            <label htmlFor="subject" className="text-sm col-span-1 font-medium">
              Subject
            </label>
            <Input placeholder="Email Subject..." id="subject" className="border-0 bg-inherit outline-0 col-span-3" />
          </div>
          <hr className="border-t-graylight6" />
          <div className="w-full h-full">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Mention fields with '@' and write your message"
              className="resize-none overflow-hidden bg-white w-full p-3 rounded-xl border-0 shadow-sm"
              rows={17}
            />
          </div>
          <Button className="rounded-lg justify-self-end w-[3.625rem] h-[2.125rem] bg-gradient-to-r from-linear-blue-from  to-linear-blue-to flex gap-3 px-1.5 py-0.5">Send</Button>
        </div>
      </div>
    </main>
  );
}
