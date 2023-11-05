import { useParams } from 'react-router-dom';

export default function DeepLinkHandler() {
  const { path, token } = useParams();

  let targetRoute = '/'; // Set a default route

  if (path === 'PasswordReset') {
    console.log(path)
    targetRoute = `/${path}/${token}`
  }

  history.push(targetRoute);

  return (
    <>
      <div className="loading-indicator">
        <p>Loading...</p>
      </div>


      {path && token ? (
        <p>Processing the deep link...</p>
      ) : (
        <p>No valid deep link provided.</p>
      )}
    </>

  )
}
