"use client";

import { type StepDefinition, Stepper } from "@/components/navigation/stepper";
import { Heading } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { SelectColumnsStep } from "./components/select-columns-step";
import { SelectFileStep } from "./components/select-file-step";

const accept = { "text/csv": [".csv"] };

const steps: StepDefinition[] = [];

const ImportCsvPage = () => {
	const [file, setFile] = useState<File | undefined>(undefined);
	const steps = useMemo<StepDefinition[]>(() => {
		return [
			{
				id: 0,
				label: <Heading>Select your import file</Heading>,
				content: <SelectFileStep file={file} onFileSelected={setFile} />,
				isIncomplete: !file,
			},
			{
				id: 1,
				label: <Heading>Select the columns to import</Heading>,
				content: <SelectColumnsStep file={file!} />,
				isIncomplete: !!file,
			},
		];
	}, [file]);
	return <Stepper steps={steps} />;
};

export default ImportCsvPage;
