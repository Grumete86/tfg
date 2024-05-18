import Layout from "@/Layouts/Layout"
import ShowLayout from "@/Components/pages/Show"

export default function Dashboard({ auth }) {
    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <ShowLayout>
                Hola que pasa
            </ShowLayout>

        </Layout>
    )
}

