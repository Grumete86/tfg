import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import Layout from "@/Layouts/Layout";
import IndexLayout from "@/Components/pages/Index";
import IndexRow from "@/Components/pages/partials/IndexRow";
import IndexRowButton from "@/Components/pages/partials/IndexRowButtons";

export default function Index({ auth, companies }) {
    const [companyList, setCompanyList] = useState(companies);
    const updateCompany = (updatedCompanies) => {
        setCompanyList(updatedCompanies.props.companies);
    }


    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Empresas</h2>}
        >
            <IndexLayout>
                <CreateModal className="max-w-xl" updateCompany={updateCompany} />
                {companyList.map(company => (
                    <IndexRow key={company.id} className="p-2">
                        <a href={route('admin.companies.show', company)} >
                            {company.name}
                        </a>
                        <IndexRowButton>
                            <EditModal className="max-w-xl" company={company} updateCompany={updateCompany} />
                            <DeleteModal className="max-w-xl" company={company} updateCompany={updateCompany} />
                        </IndexRowButton>
                    </IndexRow>
                ))}
                <CreateModal className="max-w-xl" updateCompany={updateCompany} />
            </IndexLayout>
        </Layout>
    )
}

