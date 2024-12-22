import useObserver from "../hooks/useObserver";
import BrowserStorage from "../utils/BrowserStorage";
import type { IStorage } from "../utils/BrowserStorage";
import { addTabListener } from "../utils/tabListener";

const main = async () => {
  const { onObserve } = useObserver();

  const checkBlackListUser = (element: HTMLElement | null, store: IStorage) => {
    if (!element || !element.textContent) return false;
    const [name] = element.innerText.split("@");
    const filteredTexts = store.blackList.split(",");

    return filteredTexts.some((text) => {
      if (text.trim() && name.includes(text)) return true;
      const emojis = element.querySelectorAll("img");

      let findEmoji = false;
      emojis.forEach((emoji) => {
        if (emoji.alt.includes(text)) findEmoji = true;
      });
      return findEmoji;
    });
  };
  const hideBlackListedTweet = async () => {
    const tweets = document.querySelectorAll("[data-testid=cellInnerDiv]");
    const store = await BrowserStorage.get();
    tweets.forEach((tweet) => {
      // Tweets
      const usernameElement = tweet.querySelector("[data-testid=User-Name]");
      const isTweetHidden = checkBlackListUser(
        usernameElement as HTMLElement,
        store
      );
      if (isTweetHidden) (tweet as any).style.display = "none";
      else (tweet as any).style.display = "";

      // Quotes
      const quotes = tweet.querySelectorAll("div[role=link]");
      quotes.forEach((quote) => {
        const quoteUsernameElement = quote.querySelector(
          "[data-testid=User-Name]"
        );
        const isQuoteHidden = checkBlackListUser(
          quoteUsernameElement as HTMLElement,
          store
        );
        if (isQuoteHidden) (quote as any).style.display = "none";
        else (quote as any).style.display = "";
      });
    });
  };

  addTabListener("addBlackList", () => {
    hideBlackListedTweet();
  });
  onObserve(() => {
    hideBlackListedTweet();
  });
};
main();
