import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { ComponentProps, useMemo } from "react";

export interface AutocompleteItem {
	label: string;
	value: number;
}

interface AutocompleteProps
	extends Omit<
		ComponentProps<typeof MuiAutocomplete>,
		"value" | "options" | "onChange"
	> {
	options: AutocompleteItem[];
	value?: number;
	name: string;
	onChange: (name: string, obj: AutocompleteItem) => void;
}

function Autocomplete({
	options,
	value,
	onChange,
	name,
	...props
}: AutocompleteProps) {
	const optionsMap = useMemo(
		() => new Map(options.map((item) => [item.value, item])),
		[options],
	);

	return (
		<MuiAutocomplete
			{...props}
			options={options}
			value={optionsMap.get(value) ?? null}
			onChange={(ev, obj: AutocompleteItem) => onChange(name, obj)}
		/>
	);
}

export default Autocomplete;
