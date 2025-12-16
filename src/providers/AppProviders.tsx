import ApiProvider from "./ApiProvider"


interface AppProvidersProps {
  children: React.ReactNode
}
const AppProviders = (props: AppProvidersProps) => {
  return (
    <ApiProvider>{props.children}</ApiProvider>
  )
}
export default AppProviders
