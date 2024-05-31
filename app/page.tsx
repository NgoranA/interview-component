import EmailForm from "@/components/FormComponent/EmailForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen text-graylight11 bg-white font-medium items-center p-3 justify-center text-sm">
      <EmailForm />
    </main>
  );
}
