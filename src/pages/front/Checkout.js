import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Input } from '../../components/FormElements';

export default function Checkout() {
  const { cartData } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form,
    );
    console.log('useForm', res);
    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <>
      <div className=" pt-5 pb-7 full-height">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
              <div className=" p-4">
                <h4 className="fw-bold">訂單資料</h4>
                <div className="mb-2">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="test@gmail.com"
                    errors={errors}
                    register={register}
                    rules={{
                      required: 'Email為必填',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'email格式不正確',
                      },
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="name"
                    labelText="姓名"
                    type="text"
                    placeholder="請輸入姓名"
                    errors={errors}
                    register={register}
                    rules={{
                      required: '姓名為必填',
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="tel"
                    labelText="手機"
                    type="tel"
                    errors={errors}
                    register={register}
                    placeholder="0987654321"
                    rules={{
                      required: '手機為必填',
                      pattern: {
                        value: /^09\d{8}$/,
                        message: '手機號碼格式錯誤，需以09開頭且共10碼',
                      },
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="address"
                    labelText="寄送地址"
                    type="address"
                    errors={errors}
                    register={register}
                    placeholder="請輸入寄送地址"
                    rules={{
                      required: '寄送地址為必填',
                    }}
                  ></Input>
                </div>
              </div>
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link className="text-dark mt-md-0 mt-3" to="/cart">
                  <i className="bi bi-chevron-left me-2"></i> 回到購物車
                </Link>
                <button
                  type="submit"
                  className="btn btn-dark py-3 px-7 rounded-0"
                >
                  送出訂單
                </button>
              </div>
            </form>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">選購商品</h4>
                {cartData?.carts?.map((item) => {
                  return (
                    <div className="d-flex my-2" key={item.id}>
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="me-2"
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between fw-bold">
                          <p className="mb-0">{item.product.title}</p>
                          <p className="mb-0">x{item.qty}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="text-muted mb-0">
                            <small>NT$ {item.product.price}</small>
                          </p>
                          <p className="mb-0">NT$ {item.final_total}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">Total</p>
                  <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
