import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";

const SpotifyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const SpotifyLoginPopup = () => {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const handleSpotifyLogin = () => {
    signIn("spotify");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      {!session ? (
        <button
          onClick={handleSpotifyLogin}
          className="bg-white text-black border border-black rounded px-6 py-3 flex items-center justify-center hover:bg-gray-100 transition duration-300 text-sm font-medium"
        >
          <SpotifyIcon className="w-5 h-5 mr-3" />
          Login con Spotify
        </button>
      ) : (
        <div>
          <p className="text-black font-medium mb-4">Conectado como {session.user.name}</p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-black text-white rounded px-6 py-3 hover:bg-gray-800 transition duration-300 text-sm font-medium"
          >
            Ver perfil
          </button>
        </div>
      )}

      {showPopup && session && (
        <PopupContent onClose={() => setShowPopup(false)} session={session} />
      )}
    </div>
  );
};

const PopupContent = ({ onClose, session }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700"
        >
          ✕
        </button>

        <div className="space-y-6">
          <h2 className="text-2xl font-light text-center">Perfil de Spotify</h2>
          <div className="flex flex-col items-center">
            <img 
              src={session.user.image}
              alt={session.user.name} 
              className="w-32 h-32 object-cover mb-4 rounded-full"
            />
            <p className="font-medium text-xl">{session.user.name}</p>
            <p className="text-gray-600 mb-2 font-light">{session.user.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition duration-300 text-sm font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyLoginPopup;
