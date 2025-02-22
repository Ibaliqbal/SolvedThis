import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FormAuthLayout = ({ children }: Props) => {
  return (
    <Card className="w-full max-w-4xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <section className="relative hidden md:block md:w-1/2">
          <Image
            src="/discussion.jpg"
            alt="People discussing"
            layout="fill"
            objectFit="cover"
          />
        </section>
        {children}
      </div>
    </Card>
  );
};

export default FormAuthLayout;
