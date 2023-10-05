import UserProfile from '../UserProfile/UserProfile'
import styles from './DashboardLayout.module.css'
import AlertMessage from '../../AlertMessage/AlertMessage'


export default function DashboardLayout({ session }) {
    return (
        <div className={styles.dashboard_container}>
            <h2>Dashboard</h2>
            <UserProfile session={session} />
            <AlertMessage
                type="warning"
                headline="🚧 Work in progress!"
                message="This page is still under construction."
            />
        </div>
    )
}