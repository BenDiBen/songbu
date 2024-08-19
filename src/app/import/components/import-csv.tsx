import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { ImportWizardProps } from "./types";

type Inputs = { file: File };

export const ImportCsv = ({ state }: ImportWizardProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{ file: File }>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	const file = watch();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>{JSON.stringify(file)}</p>
			<VStack>
				<FileDragAndDrop inputProps={{ ...register("file"), accept: ".csv" }} />
				<Button type="submit">Submit</Button>
			</VStack>
		</form>
	);
};
