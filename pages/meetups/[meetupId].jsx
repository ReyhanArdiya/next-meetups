import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

const { MONGO_URI } = process.env;

export const getStaticPaths = async () => {
	try {
		const client = await MongoClient.connect(MONGO_URI);
		const db = client.db();
		const Meetup = db.collection("meetups");
		const meetups = await Meetup.find({}, { _id: 1 }).toArray();

		await client.close();

		const paths = meetups.map(meetup => ({
			params: {
				meetupId: meetup._id.toString()
			}
		}));

		return {
			paths,
			fallback: false
		};
	} catch (err) {
		await client.close();
		console.error(err);
	}
};

export const getStaticProps = async context => {
	const { meetupId } = context.params;

	try {
		const client = await MongoClient.connect(MONGO_URI);
		const db = client.db();
		const Meetup = db.collection("meetups");
		const meetup = await Meetup.findOne({ _id: ObjectId(meetupId) });
		await client.close();
		delete meetup._id;

		return {
			props: meetup
		};
	} catch (err) {
		await client.close();
		console.error(err);
	}
};

// export const getServerSideProps = async context => {
// 	const { meetupId } = context.params;
// 	console.log(meetupId);
// 	return {
// 		props: {
// 			image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Maison_Carree_in_Nimes_%2816%29.jpg",
// 			title: "A first meetup",
// 			address: "Blah 1 street",
// 			description: "The description"
// 		}
// 	};
// };

const MeetupDetailPage = ({ image, title, address, description }) => {
	console.log(image, title, address, description);
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>

			<MeetupDetail
				img={image}
				title={title}
				address={address}
				description={description}
			/>
		</>
	);
};

export default MeetupDetailPage;
