import MeetupList from "../../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
// import proveContext from "../../helpers/prove-context";

// console.log("In index file");
const { MONGO_URI } = process.env;
// proveContext();
export const getStaticProps = async () => {
	// console.log("In getStaticProps");
	// proveContext();

	try {
		const client = await MongoClient.connect(MONGO_URI);
		const db = client.db();
		const Meetup = db.collection("meetups");
		const meetups = await Meetup.find().toArray();

		await client.close();
		return {
			props: {
				meetups: meetups.map(meetup => {
					meetup.id = meetup._id.toString();
					delete meetup._id;
					return meetup;
				})
			},
			revalidate: 1
		};
	} catch (err) {
		console.log(req.body);
		await client.close();
		throw err;
	}
};

// export const getServerSideProps = async context => {
// 	console.log(context.req.header);
// 	console.log(context.req.body);
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUP
// 		}
// 	};
// };

const Meetup = ({ meetups }) => {
	return (
		<>
			<Head>
				<title>Meetups</title>
			</Head>
			<h1>{process.env.MONGO_URI}</h1>
			<MeetupList meetups={meetups} />
		</>
	);
};

export default Meetup;
