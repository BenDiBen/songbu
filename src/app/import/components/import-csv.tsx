import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import type { ImportWizardProps } from "./types";

type Inputs = { file: FileList };

const accept = { "Comma-separated values": [".csv"] };

export const ImportCsv = ({ state }: ImportWizardProps) => {
	const form = useForm<Inputs>();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = form;

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	const file = watch();

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>{JSON.stringify(file)}</p>
				<VStack>
					<FileDragAndDrop name="files" accept={accept} />
					<Button type="submit">Submit</Button>
				</VStack>
			</form>
		</FormProvider>
	);
};
