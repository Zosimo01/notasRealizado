import { useContext, useRef, useState } from "react"

import { Contex } from "../contexts/AuthContex"
import { AuthDispatch_changepassword, AuthDispatch_login, AuthDispatch_restaurarcontra } from "../dispatch/AuthDispatch"
import { addLoading } from "../helpers/AnimationLoading";
import { useForm } from "../hooks/useForm";


interface Props {
  handleLogout: () => void,
}

export const Login = ({ handleLogout }: Props) => {

  const ref = useRef<HTMLButtonElement>(null)
  const [shoawInput, setshoawInput] = useState(true);
  const [values, setvalues] = useState({
    disabled: false,
    smg: '',
    inputCody: false,
    modal: false,
    name1: 'email',
    name2: 'codigo',
    cody: ''
  });

  const { dispatchLogin, dispatchToken } = useContext(Contex);

  const { data, handleChange } = useForm({
    email: '',
    password: '',
    demo: 'guardar', codigo: '',
    nueva_contraseña: '',
    repita_contraseña: ''
  });


  const handleEnter = (e: any) => {
    e.preventDefault();
    const node = ref.current as HTMLButtonElement;

    const resp = addLoading(node, 'add_loading');
    const laoding = document.querySelector('.' + resp) as HTMLElement;
    node.disabled = true;
    if (shoawInput) {

      const datas = {
        email: data.email,
        password: data.password,
        demo: data.demo
      }
      setTimeout(() => {

        AuthDispatch_login(datas)
          .then(resp => {

            if (resp.ok) {
              dispatchToken({
                name: resp.nameuser,
                ok: resp.ok,
                uid: resp._id,
                demo: resp.demo,
                value: resp.value
              });
            } else {
              setvalues({ ...values, smg: 'datos incorrectos' });
              node.disabled = false;
              laoding.remove();
            }
            dispatchLogin(resp.ok)
          })
          .catch((err) => {

            dispatchToken({ name: '', ok: false, uid: '', demo: '', value: '' });
            dispatchLogin(false);
            laoding.remove();

          })
      }, 2000);
    }
    else if (values.modal) {

      if (data.nueva_contraseña.length > 5 && data.nueva_contraseña === data.repita_contraseña) {

        ///LOADING 
        node.disabled = true;

        AuthDispatch_changepassword({
          email: data.email,
          password: data.repita_contraseña
        }).then(resp => {
          setvalues({ ...values, smg: 'contraseña cambiada exitosamente!' });
          laoding.remove();
        }).catch(err => {
          setvalues({ ...values, smg: 'se produjo un error - inténtelo luego!' });
          laoding.remove();
        })

      } else {
        setvalues({
          ...values,
          smg: 'la contraseña no coincide ó tiene menos de 5 caracteres'
        });
        laoding.remove();
        node.disabled = false
      }
    }
    else {

      if (!values.inputCody) {

        const cody = (Math.random() * 1000).toFixed(0);
        const datas = {
          email: data.email,
          codigo: cody
        }
      
        node.disabled = true
        AuthDispatch_restaurarcontra(datas)
          .then(resp => {
            console.log(resp)
            if (resp.ok) {
              setvalues({ ...values, inputCody: true, cody, smg: resp.smg });
              node.disabled = false;
              laoding.remove();

            } else {

              setvalues({ ...values, smg: resp.smg });
              node.disabled = false
              laoding.remove();

            }
          }).catch((err) => {
            node.disabled = false;
            laoding.remove();

          })
      }
      else {

        if (data.codigo.trim() !== values.cody.trim()) {
          node.disabled = false;
          setvalues({ ...values, smg: 'el codigo es incorrecto' })
          laoding.remove();
        }
        else {
          node.disabled = true

          setTimeout(() => {

            setvalues({
              ...values,
              name1: 'nueva_contraseña', name2: 'repita_contraseña', modal: true
            });
            node.disabled = false;
            laoding.remove();

          }, 1500)

        }
      }
    }

  }


  const handleRestaurar = (name: string) => {
    if (name === 'login') {
      setshoawInput(true);
    } else {

      setshoawInput(false);

    }

  }




  return (
    <>
      <form className="user_login" onSubmit={handleEnter}>
        <label htmlFor="email">{values.name1}: </label>
        <input type={!values.modal ? "email" : 'password'} name={values.name1} id="email"
          autoComplete="off"
          spellCheck={false}
          onChange={handleChange}
          value={!values.modal ? data.email : data.nueva_contraseña}
        />
        {
          shoawInput && <>
            <label htmlFor="password">password: </label>
            <input type='password' name="password" id="password"
              onChange={handleChange}
              autoComplete="off"
              value={data.password}
            />
          </>
        }
        {
          values.inputCody && (
            <input
              style={{ marginTop: '5px' }}
              type='text' name={values.name2} id='cody'
              autoComplete="off"
              placeholder={values.name2}
              onChange={handleChange}
              value={!values.modal ? data.codigo : data.repita_contraseña}
            />
          )
        }
        <div className="user_botton" >

          <button ref={ref}
          > {shoawInput ? 'login' : 'enviar'} </button>
          <p style={{ color: 'red', paddingBottom: '7px', fontSize: 'large' }}  >__ {values.smg} </p>
          {
            !values.inputCody
            && (<p> ¿no tienes una cuenta? :
              <a href="##:login" onClick={handleLogout} > crear</a>
            </p>)

          }

          {

            !values.inputCody &&
            (shoawInput
              ? (<p> ¿olvído la contraseña? :
                <a href="##:login" onClick={() => handleRestaurar('restaurar')} > crear nueva contraseña</a>
              </p>)
              : (<p> ¿iniciar sección? :
                <a href="##:login" onClick={() => handleRestaurar('login')} > login</a>
              </p>))
          }


        </div>
        {
          values.inputCody &&
          <input type="reset" value='salir!' onClick={() => window.location.reload()} style={{backgroundColor:'Background',color:'red'}} />
        }

      </form>

    </>
  )
}
