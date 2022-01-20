import { SyntheticEvent, useContext, useRef, useState, useEffect } from "react";
import ISOCountries, { GetNameOptions, LocalizedCountryNames } from "i18n-iso-countries";
import request from "../../request";
import { useSelector } from "react-redux";
import { userState } from "../../store";
import { ColorPicker, ComboBox, Dropdown, IColorPickerProps, IColorPickerStyles, IComboBoxStyles, IDropdownStyles, Label, PrimaryButton, Text, TextField } from "@fluentui/react";

interface IISOCountry {
    key: string;
    text: string;
}

export default function Company() {
    const { email: userEmail } = useSelector(userState);
    // REF
    const formRef = useRef<HTMLFormElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<IISOCountry[]>([]);
    const [selectedFile, setSelectedFile] = useState<any>('');
    const [alphaType, setAlphaType] = useState<IColorPickerProps['alphaType']>('alpha');

    useEffect(() => {
        const _countries = ISOCountries.getNames("fr");
        const entries = Object.entries(_countries).map((e) => ({ 'key': e[0], 'text': e[1] }))
        setCountries(entries);
    }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //     }, 2000);        
    // }, [])

    const onSave = async (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
            email: { value: string };
            country: { value: string };
            state: { value: string };
            city: { value: string };
            zip_code: { value: string };
            address: { value: string };
            primary_color: { value: string };
            secondary_color: { value: string };
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("name", target.name.value);
            formData.append("description", target.description.value);
            formData.append("email", target.email.value);
            formData.append("state", target.state.value);
            formData.append("city", target.city.value);
            formData.append("zip_code", target.zip_code.value);
            formData.append("address", target.address.value);
            formData.append("primary_color", target.primary_color.value);
            formData.append("secondary_color", target.secondary_color.value);
            formData.append("logo", selectedFile);
            formData.append("country", ISOCountries.alpha2ToNumeric(target.country.value));

            // console.log("Form Data : ", formData.getAll);

            const res = await request.post("company", {
                name: target.name.value,
                description: target.description.value,
                email: target.email.value,
                state: target.state.value,
                city: target.city.value,
                zip_code: target.zip_code.value,
                address: target.address.value,
                primary_color: target.primary_color.value,
                secondary_color: target.secondary_color.value,
                country: target.country.value,
            });

            console.log(res.data);

        } catch (error: any) {
            console.error(error?.response?.data?.errors);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-10">
            <div className="section-container">
                <Text className="font-bold mb-5" variant="xxLargePlus">Mon entreprise</Text>
                <hr /><br />
                <form ref={formRef} onSubmit={onSave}>
                    <TextField name="name" label="Nom de l'entreprise" />
                    <TextField label="Description" name="description" multiline rows={4} />
                    <TextField type="email" name="email" label="Email" defaultValue={userEmail!} />
                    <TextField // prettier-ignore
                        label="Site web"
                        prefix="https://"
                    />
                    <ComboBox
                        label="Pays"
                        placeholder="Choisir pays"
                        options={countries}
                        styles={comboBoxStyles}
                        calloutProps={{ doNotLayer: false }}
                    />

                    <TextField name="state" label="Province" />
                    <TextField name="city" label="Ville" />
                    <TextField name="zip_code" label="Code postal" />
                    <TextField name="address" label="Adresse" multiline rows={2} resizable={false} />
                    <div>
                        <Label htmlFor="logo">Votre logo</Label>
                        <input type="file" name="logo" id="logo" accept="image/*" onChange={({ target }) => setSelectedFile(target.files![0])} />
                    </div>
                    <div>
                        <Label htmlFor="primary_color">Color de base</Label>
                        {/* <input type="color" name="primary_color" id="primary_color" /> */}
                        <ColorPicker alphaType="alpha" color="white" onChange={() => { }} showPreview={true} strings={{ hueAriaLabel: 'Hue' }} styles={colorPickerStyles} />
                    </div>
                    <div>
                        <Label htmlFor="secondary_color">Color</Label>
                        <input type="color" name="secondary_color" id="secondary_color" />
                    </div><br />

                    {/* <button className={loading ? "button-action loading" : "button-action"} type="submit" disabled={loading}>{loading ? '...' : 'Soumettre'}</button> */}

                    <PrimaryButton text="Enregistrer" type="submit" disabled={loading} />
                </form>
            </div><br /><br />
        </div>
    )
}

const colorPickerStyles: Partial<IColorPickerStyles> = {
    panel: { padding: 12 },
    root: {
        maxWidth: 352,
        minWidth: 352,
    },
    colorRectangle: { height: 268 },
};

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: '100%' },
};

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 400 } };