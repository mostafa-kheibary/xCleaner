<script lang="ts">
  import xLogo from "../../../assets/icons/x.svg";
  import { onMount } from "svelte";
  import BrowserStorage from "../../../utils/BrowserStorage";
  import { sendMessage } from "src/utils/tabListener";

  let blackList = "";
  onMount(async () => {
    const store = await BrowserStorage.get();
    blackList = store.blackList;
  });
  const handleApply = () => {
    BrowserStorage.set({ blackList });
    sendMessage("addBlackList", true);
  };
</script>

<div class="container">
  <img width="50px" src={xLogo} alt="" />
  <h2 class="title">xCleaner</h2>
  <div class="content">
    <form on:submit|preventDefault={handleApply} class="input-wrapper">
      <input
        class="input"
        placeholder="black list character or emoji"
        bind:value={blackList}
        type="text"
      />
      <button class="button" type="submit">Apply</button>
    </form>
    <p>Separate by <span class="bold">,</span> to add multiple name</p>
  </div>
</div>

<style lang="scss" module>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  :global(*) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    padding: 0;
    box-sizing: border-box;
  }
  :global(body) {
    background-color: #000;
    color: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem 2rem;
    max-width: 24rem;
    width: 24rem;
    height: 19rem;
    .title {
      font-weight: 500;
    }
    .description {
      margin-top: -1rem;
      font-size: 0.9rem;
      color: #ffffff89;
      font-weight: 300;
    }
    .content {
      width: 100%;
      margin-top: auto;
      text-align: center;
    }
    .input-wrapper {
      display: flex;
    }
    .input {
      background-color: transparent;
      border: 2px solid #fff;
      outline: none;
      padding: 0.9rem;
      border-radius: 10rem 0 0 10rem;
      width: 100%;
      color: #fff;
    }
    .button {
      padding: 0.9rem 1.2rem;
      padding-left: 0.5rem;
      cursor: pointer;
      border-radius: 0 10rem 10rem 0;
      border: none;
      background-color: #fff;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: #e3e3e3;
      }
    }
    .bold {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
</style>
