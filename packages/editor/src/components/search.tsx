import { useCallback, useEffect, useRef } from "react";
import {
  closeSearchPanel,
  findNext,
  findPrevious,
  getSearchQuery,
  search,
  SearchQuery,
  setSearchQuery,
} from "@codemirror/search";
import { EditorView, runScopeHandlers } from "@uiw/react-codemirror";
import { createRoot } from "react-dom/client";

import { cn } from "@codeconnect/ui";
import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import { Input } from "@codeconnect/ui/input";
import { Toggle } from "@codeconnect/ui/toggle";

function SearchPanel({ view }: { view: EditorView }) {
  const searchRef = useRef<HTMLInputElement>(null);
  const caseSensitiveRef = useRef<HTMLButtonElement>(null);
  const wholeWordRef = useRef<HTMLButtonElement>(null);
  const regexRef = useRef<HTMLButtonElement>(null);
  const query = getSearchQuery(view.state);

  const handleClose = useCallback(() => {
    closeSearchPanel(view);
  }, [view]);

  const handleFindNext = () => {
    findNext(view);
  };
  const handleFindPrevious = () => {
    findPrevious(view);
  };
  const handleDocumentKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (runScopeHandlers(view, e, "search-panel")) {
        e.preventDefault();
      } else if (e.key === "Enter" && e.target === searchRef.current) {
        e.preventDefault();
        (e.shiftKey ? findPrevious : findNext)(view);
      } /* else if (e.key === "Enter" && e.target === this.replaceField) {
      e.preventDefault();
      replaceNext(this.view);
    } */
    },
    [view],
  );

  const commit = useCallback(() => {
    const newQuery = new SearchQuery({
      search: searchRef.current?.value ?? "",
      caseSensitive:
        caseSensitiveRef.current?.dataset.state === "on" ? true : false,
      regexp: regexRef.current?.dataset.state === "on" ? true : false,
      wholeWord: wholeWordRef.current?.dataset.state === "on" ? true : false,
      // replace,
    });
    if (!newQuery.eq(query)) {
      /* setQuery(newQuery); */
      view.dispatch({
        effects: setSearchQuery.of(newQuery),
      });
    }
  }, [query, view]);

  useEffect(() => {
    searchRef.current?.focus();
    document.addEventListener("keydown", handleDocumentKeydown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeydown);
    };
  }, [handleDocumentKeydown]);

  useEffect(() => {
    commit();
  }, [commit]);

  return (
    <div className="search-panel flex w-[480px] items-center justify-between gap-3 p-2 pl-6">
      <div className="flex items-center gap-3">
        <div className="relative mr-auto w-full flex-1">
          <Input
            ref={searchRef}
            placeholder="Search..."
            className="h-8 w-full rounded-none pr-[85px]"
            main-field="true"
            defaultValue={query.search}
            onChange={commit}
          />
          <div className="absolute right-16 top-1 flex size-4 gap-0">
            <Toggle
              ref={caseSensitiveRef}
              size="xs"
              onPressedChange={commit}
              defaultPressed={query.caseSensitive}
            >
              <icons.CaseSensitiveIcon className="size-4" />
            </Toggle>
            <Toggle
              ref={wholeWordRef}
              size="xs"
              onPressedChange={commit}
              defaultPressed={query.wholeWord}
            >
              <icons.WholeWordIcon className="size-4" />
            </Toggle>
            <Toggle
              ref={regexRef}
              size="xs"
              onPressedChange={commit}
              defaultPressed={query.regexp}
            >
              <icons.RegExIcon className="size-4" />
            </Toggle>
          </div>
        </div>
        <Button size="xs" variant="ghost" onClick={handleFindPrevious}>
          <icons.ArrowUpIcon className="size-4" />
        </Button>
        <Button size="xs" variant="ghost" onClick={handleFindNext}>
          <icons.ArrowDownIcon className="size-4" />
        </Button>
      </div>
      <Button size="xs" variant="ghost" onClick={handleClose}>
        <icons.CloseIcon className="size-4" />
      </Button>
    </div>
  );
}

export const customSearchPanel = search({
  scrollToMatch: (range) => EditorView.scrollIntoView(range), // Scroll to the match
  createPanel: (view) => {
    const dom = document.createElement("div");
    dom.className = cn("absolute right-8 bg-background");
    const root = createRoot(dom);
    root.render(<SearchPanel view={view} />);
    return {
      // Create an empty search panel
      dom,
      top: true,
    };
  },
});
