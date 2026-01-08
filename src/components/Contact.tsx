import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    e.preventDefault();

    const myForm = e.target as HTMLFormElement;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          String(value),
        ])
      ).toString(),
    })
      .then(() => {
        toast.success("¡Mensaje enviado!", {
          description: "Te responderé lo antes posible.",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("¡Error al enviar el mensaje!", {
          description: "Por favor, intenta nuevamente o contacta por otras vías.",
        });
      });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-32 bg-background" ref={ref}>
      <Toaster />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="animate-slide-in-left">
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              Contacto
            </span>

            <h2 className="mt-4 heading-display text-5xl md:text-6xl lg:text-7xl text-foreground">
              Contáctame
            </h2>

            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-md">
              ¿Tienes un proyecto en mente? Me encantaría saber más sobre él y
              explorar cómo podemos colaborar juntos.
            </p>

            <div className="mt-12 flex items-center gap-6">
              <a
                href="https://www.instagram.com/valentinaroseroa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons-sprite.svg#instagram"></use>
                </svg>
              </a>
              <a
                href="mailto:valenrosero9@gmail.com"
                className="p-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-300"
                aria-label="Email"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons-sprite.svg#mail"></use>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm uppercase tracking-wider text-muted-foreground"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="bg-secondary/50 border-border/50 focus:border-accent h-12"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="bg-secondary/50 border-border/50 focus:border-accent h-12"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm uppercase tracking-wider text-muted-foreground"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  className="bg-secondary/50 border-border/50 focus:border-accent resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 uppercase tracking-widest text-sm"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
