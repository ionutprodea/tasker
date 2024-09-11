import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
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
  const [result, setResult] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData, e: Event) => {
    console.log(data);
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    }).then(async (response) => {
      let json = await response.json();
      if (json.success) {
      }
    });
    reset();
  };

  return (
    <>
      <h1 className="m-5">Contact</h1>
      <div className="m-5 centered-container">
        <form className="add-task">
          <input
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Name..."
            className="form-control mb-4"
            autoComplete="off"
          />
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            className="form-control mb-4"
            autoComplete="off"
          />
          <textarea
            {...register("message")}
            name="message"
            id="message"
            placeholder="Message..."
            className="form-control mb-4 details"
            autoComplete="off"
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary px-5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
