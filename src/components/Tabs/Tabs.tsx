import styles from './Tabs.module.css'

type TabsProps = {
    tabs: Array<string>,
    currentTab: string,
    setCurrentTab: (tab: string) => void,
    className?: string,
    selectedClassName?: string,
}

const Tabs = ({ tabs, currentTab, setCurrentTab, className, selectedClassName }: TabsProps) => (
    <div className={styles.tabs}>
        {tabs.map((tab) => {
            const tabClassName = className || styles.tab
            const active = selectedClassName || styles.active
            return (
                <button
                    key={tab}
                    className={`${tabClassName} ${tab === currentTab ? active : ''}`}
                    onClick={() => setCurrentTab(tab)}
                >
                    {tab}
                </button>
            )
        })}
    </div>
)

export default Tabs