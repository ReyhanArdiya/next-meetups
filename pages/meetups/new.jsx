import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
	const router = useRouter();

	const addMeetupHandler = async meetupData => {
		try {
			const newMeetup = await fetch("/api/meetups", {
				body: JSON.stringify(meetupData),
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});

			console.log(await newMeetup.json());

			router.replace("/meetups");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Head></Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetup;
