import { type SubmitHandler, useForm } from "react-hook-form";
import { ImportCsv } from "./import-csv";
import type { ImportWizardProps } from "./types";

type Inputs = { name: string };

export const ImportStep = (props: ImportWizardProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	switch (props.state.importType) {
		case "csv":
			return <ImportCsv {...props} />;
		case "folder":
			return null;
		case "songbookslive":
			return null;
	}
};
