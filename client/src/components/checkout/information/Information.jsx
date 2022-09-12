import { UserAuth } from '../../../contexts/AuthContext';
import Layout from '../Layout';
import AddInfo from './AddInfo';

const Information = () => {
  const { contextShipping, contextUser } = UserAuth();
  const [user] = contextUser;
  const [shipping, setShipping] = contextShipping;

  return (
    <Layout>
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-medium text-gray-900">
          Adresse de livraison
        </h2>
        {shipping && (
          <div className="my-4">
            <p>{`${shipping?.firstname} ${shipping?.lastname}`}</p>
            <p>{shipping?.address}</p>
            <p>{`${shipping?.city} ${shipping?.zipcode}`}</p>
            {shipping.apartment && <p>{shipping?.apartment}</p>}
            <p>{shipping?.phone}</p>
          </div>
        )}

        <AddInfo user={user} shipping={shipping} setShipping={setShipping} />
      </div>
    </Layout>
  );
}

export default Information