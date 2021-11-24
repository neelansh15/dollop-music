import SecondaryButton from "components/Buttons/Secondary";
import PrimaryButton from "../components/Buttons/Primary";

function profile() {
  return (
    <div className="max-w-2xl md:max-w-7xl mx-5 md:mx-auto mt-10">
      <div className="p-8 bg-dark-400 flex items-center justify-between rounded-lg">
        <div className="flex items-center space-x-5">
          <img
            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80"
            alt=""
            className="w-25 h-25 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold">Marshall Mathers</h1>
            <h3 className="text-gray-400">Eminem</h3>
          </div>
        </div>
        <div>
          <div className="space-x-2">
          <PrimaryButton>Follow</PrimaryButton>
          <SecondaryButton>Message</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
