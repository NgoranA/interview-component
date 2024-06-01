import AdvancedComponent from "@/components/CustomComponents/AdvancedFilter/AdvancedComponent";
import EmailForm from "@/components/CustomComponents/FormComponent/EmailForm";


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-20  justify-center text-graylight11 bg-white font-medium items-center py-20  text-sm">
      <EmailForm />
      <AdvancedComponent />
    </main>
  );
} 
