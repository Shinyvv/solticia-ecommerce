import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppCta() {
  return (
    <section className="rounded-[2.5rem] border border-foreground/5 bg-linear-to-br from-[#f5efe6] via-white to-[#f0e7db] p-8 text-center md:p-12">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
        Atención personalizada
      </p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
        Encuentra tu próximo outfit
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/70 md:text-base">
        Nuestro equipo está listo para asesorarte con una experiencia boutique
        premium. Escríbenos por WhatsApp y reservemos tu próxima prenda.
      </p>
      <Button asChild size="lg" className="mt-6 rounded-full">
        <a href={getWhatsAppLink("Hola! Quiero asesoría para elegir mi próximo outfit.")}
          >Consultar por WhatsApp</a>
      </Button>
    </section>
  );
}
