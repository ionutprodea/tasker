import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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
  /*const [result, setResult] = useState("");*/

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });
  /*const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState("");*/

  const userName = useWatch({
    control,
    name: "name",
    defaultValue: "Someone",
  });

  useEffect(() => {
    setValue("subject", `${userName} sent a message from Website`);
  }, [userName, setValue]);

  const onSubmit = async (data: FormData, e: any) => {
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
          /*setIsSuccess(true);
          setMessage(json.message);*/
          e.target.reset();
          reset();
        } /*else {
          setIsSuccess(false);
          setMessage(json.message);
        }*/
      })
      .catch((error) => {
        /* setIsSuccess(false);
        setMessage("Client Error. Please check the console.log for more info");*/
        console.log(error);
      });
  };

  return (
    <>
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
          {errors.name && <p className="form-error">{errors.name.message}</p>}
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            className="form-control mb-4"
            autoComplete="off"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
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
        </form>
      </div>
    </>
  );
};

export default Contact;
