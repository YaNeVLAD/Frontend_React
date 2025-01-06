import styles from './Tabs.module.css'

type TabsProps = {
    tabs: Array<string>,
    currentTab: string,
    setCurrentTab: (tab: string) => void
}

const Tabs = ({ tabs, currentTab, setCurrentTab }: TabsProps) => (
    <div className={styles.tabs}>
        {tabs.map((tab) => (
            <button
                key={tab}
                className={`${styles.tab} ${tab === currentTab ? styles.active : ''}`}
                onClick={() => setCurrentTab(tab)}
            >
                {tab}
            </button>
        ))}
    </div>
)

export default Tabs