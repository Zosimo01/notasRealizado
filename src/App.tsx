import { AnimationContex } from "./main/contexts/Animation";
import { AuthProvider } from "./main/contexts/AuthContex";
import { NoteContex } from "./main/contexts/NoteContex";
import { Main } from "./main/Main";

function App() {


  return (
    <div className="App" style={{
      backgroundImage:'url(img/fondoUno.jpg)',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'center'  
      }} >
      <AuthContex>
        <Main />
      </AuthContex>
    </div>
  );
}


export const AuthContex = ({ children }: any) => {
  return (
    <AnimationContex>
      <AuthProvider>
        <NoteContex>
          {children}
        </NoteContex>
      </AuthProvider>
    </AnimationContex>
  )
}


export default App;
