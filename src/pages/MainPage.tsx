import Header from '../components/Header/Header';

export interface Props {
  name: string;
  priority?: boolean;
}

const MainPage: React.FC<Props> = () => {
  return (
    <>
    <Header />
    </>
  )
}

export default MainPage;