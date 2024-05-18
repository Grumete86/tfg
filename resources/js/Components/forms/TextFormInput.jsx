import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function TextFormInput({ name, value, onChangeCallback = () => { }, errorMessage = '', ...props }) {
    const id = slugify(name);
    const label = capitalizeFirstLetter(name);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function slugify(input) {
        if (!input)
            return '';

        // make lower case and trim
        var slug = input.toLowerCase().trim();

        // remove accents from charaters
        slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

        // replace invalid chars with spaces
        slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

        // replace multiple spaces or hyphens with a single hyphen
        slug = slug.replace(/[\s-]+/g, '-');

        return slug;
    }

    return (
        <div>
            <InputLabel htmlFor={id} value={label} />

            <TextInput
                id={id}
                name={id}
                value={value}
                className="mt-1 block w-full"
                autoComplete={id}
                onChange={onChangeCallback}
                {...props}
            />

            <InputError message={errorMessage} className="mt-2" />
        </div>
    )
}