import { BtnBack } from "@/components/button/btn-back";
import { Icon } from "@/components/icons/bootstrap-icon";
import { Card, CardBody } from "@nextui-org/react";

export const metadata = {
  title: "Lupa Password - SILKa Integrasi Badan Keuangan Daerah",
};

export default function LupaPassword() {
  return (
    <>
      <Card shadow="lg" fullWidth className="max-w-lg">
        <CardBody className="p-8">
          <h1 className="text-2xl font-bold mb-4 flex items-center justify-start gap-x-3">
            Lupa Password ? <Icon iconName="Key" size={30} color="green" />
          </h1>
          <p className="text-muted mb-8">
            Jika lupa password, silahkan hubungi Pengelola Kepegawaian pada
            masing-masing SKPD untuk melakukan reset password pada SILKa Online
          </p>
          <BtnBack path="/auth" size="lg" color="primary" variant="shadow" />
        </CardBody>
      </Card>
    </>
  );
}
