import AdminLayout from "@/Layouts/AdminLayout";
import CompanyLayout from "@/Layouts/CompanyLayout";
import WorkerLayout from "./WorkerLayout";

export default function Layout({ user, header, children }) {
    if (user.is_admin == true) {
        return (
            <AdminLayout
                user={user}
                header={header}
            >
                {children}
            </AdminLayout>
        )
    }
    else if (user.is_company == true) {
        return (
            <CompanyLayout
                user={user}
                header={header}
            >
                {children}
            </CompanyLayout>
        )
    }
    if (user.is_worker == true) {
        return (
            <WorkerLayout
                user={user}
                header={header}
            >
                {children}
            </WorkerLayout>
        )
    }
    return (
        <AdminLayout
            user={user}
            header={header}
        >
            {children}
        </AdminLayout>
    )
}