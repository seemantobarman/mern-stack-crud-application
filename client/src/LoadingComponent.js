import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
	return (
		<div
			style={{
				position: "fixed",
				top: "50%",
				left: "50%",
			}}
		>
			<Spinner st animation="border" role="status">
				<span className="sr-only sm"></span>
			</Spinner>
		</div>
	);
};

export default Loading;
