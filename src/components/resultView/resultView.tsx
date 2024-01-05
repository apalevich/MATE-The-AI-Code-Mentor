import PieChart from "~components/piechart";

const ResultView = () => {
    return (
      <div className="tw-py-16">
        <div className="tw-m-auto tw-px-6 tw-text-grey-600">
          <div className="tw-rounded-[4rem] tw-space-y-6 tw-flex tw-flex-col tw-justify-center">
            <div className="tw-text-center">
              <PieChart value="60" />
            </div>
            <div>
              <h2 className="tw-text-3xl tw-font-bold tw-text-grey-900 tw-dark:text-white">
                Nuxt development is carried out by passionate developers
              </h2>
              <p className="tw-my-8 tw-text-grey-600 tw-dark:text-grey-300">
                Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
              </p>
              <div className="tw-divide-y tw-space-y-4 tw-divide-grey-100 tw-dark:divide-grey-800">
                <div className="tw-mt-8 tw-flex tw-gap-4">
                  <div className="tw-w-12 tw-h-12 tw-flex tw-gap-4 tw-rounded-full tw-bg-indigo-100 tw-dark:bg-indigo-900/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="tw-w-6 tw-h-6 tw-m-auto tw-text-indigo-500 tw-dark:text-indigo-400">
                      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd" />
                    </svg>        
                  </div>
                  <div className="tw-w-5/6">
                    <h3 className="tw-font-semibold tw-text-lg tw-text-grey-700 tw-dark:text-indigo-300">Chat Anytime</h3>
                    <p className="tw-text-grey-500 tw-dark:text-grey-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
                  </div> 
                </div> 
                <div className="tw-mt-8 tw-flex tw-gap-4">
                  <div className="tw-w-12 tw-h-12 tw-flex tw-gap-4 tw-rounded-full tw-bg-indigo-100 tw-dark:bg-indigo-900/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
                      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>                                      
                  </div>
                  <div className="tw-w-5/6">
                    <h3 className="tw-font-semibold tw-text-lg tw-text-grey-700 tw-dark:text-teal-300">Real Time Location</h3>
                    <p className="tw-text-grey-500 tw-dark:text-grey-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
                  </div> 
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>                         
    )
  }

  export default ResultView