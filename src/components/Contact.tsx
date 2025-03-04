import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const schema = z.object({
  access_key: z.string(),
  subject: z.string(),
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 letters" })
    .max(50, { message: "Maximum 50 letters" }),
  email: z.string().email().max(99, { message: "Maximum 99 letters" }),
  message: z
    .string()
    .min(20, { message: "Minimum 20 letters" })
    .max(600, { message: "Maximum 600 letters" }),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const userName = useWatch({
    control,
    name: "name",
    defaultValue: "Someone",
  });

  useEffect(() => {
    setValue("subject", `${userName} sent a message from Tasker`);
  }, [userName, setValue]);

  const onSubmit = async (data: FormData, e: any) => {
    setSending(true);
    console.log(data);
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(async (response) => {
        let json = await response.json();
        if (json.success) {
          setIsSuccess(true);
          setSending(false);
          e.target.reset();
          reset();
        } else {
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Tasker</title>
        <meta property="og:title" content="Contact Tasker" />
        <meta
          name="description"
          content="Get in touch with Tasker! Send us a message with your questions, feedback, or suggestions—we’d love to hear from you."
        />
        <meta
          property="og:description"
          content="Get in touch with Tasker! Send us a message with your questions, feedback, or suggestions—we’d love to hear from you."
        />
        <meta
          name="keywords"
          content="Contact Tasker, Send a Message to Tasker, Reach Out to Tasker"
        />
        <meta
          property="og:keywords"
          content="Contact Tasker, Send a Message to Tasker, Reach Out to Tasker"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="app-container d-flex flex-column justify-content-between">
        <div>
          <NavBar />
          <h1 className="m-5">Contact</h1>
          <div className="m-5 centered-container">
            <form className="add-task" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="hidden"
                value="b9930498-2649-4f25-aab8-4db0265ed52c"
                {...register("access_key")}
              />
              <input type="hidden" {...register("subject")} />
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                placeholder="Name..."
                className="form-control mb-4"
                autoComplete="off"
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                className="form-control mb-4"
                autoComplete="off"
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
              <textarea
                {...register("message")}
                name="message"
                id="message"
                placeholder="Message..."
                className="form-control mb-4 details"
                autoComplete="off"
              />
              {errors.message && (
                <p className="form-error">{errors.message.message}</p>
              )}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary px-5">
                  Submit
                </button>
              </div>
              {sending && (
                <div className="d-flex justify-content-center mt-3">
                  <div className="spinner-border spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {isSuccess && (
                <p className="mt-3 d-flex justify-content-center send-confirmation">
                  Message sent
                </p>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
