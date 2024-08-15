import { useCallback, useEffect, useRef, useState } from "react";
import {
  closeSearchPanel,
  findNext,
  findPrevious,
  getSearchQuery,
  search,
  SearchQuery,
  setSearchQuery,
} from "@codemirror/search";
import { EditorView } from "@uiw/react-codemirror";
import { createRoot } from "react-dom/client";

import { cn } from "@codeconnect/ui";
import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import { Input } from "@codeconnect/ui/input";
import { Toggle } from "@codeconnect/ui/toggle";

function SearchPanel({ view }: { view: EditorView }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const initialSearchQuery = getSearchQuery(view.state);
  const [search, setSearch] = useState(initialSearchQuery.search);
  const [caseSensitive, setCaseSensitive] = useState(
    initialSearchQuery.caseSensitive,
  );
  const [wholeWord, setWholeWord] = useState(initialSearchQuery.wholeWord);
  const [regexp, setRegexp] = useState(initialSearchQuery.regexp);
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
      if (e.key === "Escape") handleClose();
    },
    [handleClose],
  );
  const handleInputKeypress = useCallback(
    (e: KeyboardEvent) => {
      console.log({ e });
      if (e.key === "Enter") findNext(view);
    },
    [view],
  );

  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
    document.addEventListener("keydown", handleDocumentKeydown);
    input?.addEventListener("keypress", handleInputKeypress);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeydown);
      input?.removeEventListener("keypress", handleInputKeypress);
    };
  }, [handleDocumentKeydown, handleInputKeypress]);

  useEffect(() => {
    const searchQuery = new SearchQuery({
      search,
      caseSensitive,
      wholeWord,
      regexp,
    });
    view.dispatch({
      effects: setSearchQuery.of(searchQuery),
    });
    // selectMatches(view);
  }, [caseSensitive, regexp, search, view, wholeWord]);
  return (
    <div className="search-panel flex w-[480px] items-center justify-between gap-3 p-2 pl-6">
      <div className="flex items-center gap-3">
        <div className="relative mr-auto w-full flex-1">
          <Input
            ref={inputRef}
            placeholder="Search..."
            className="h-8 w-full rounded-none pr-[85px]"
            main-field="true"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-16 top-1 flex size-4 gap-0">
            <Toggle
              size="xs"
              onPressedChange={(value) => {
                setCaseSensitive(value);
              }}
            >
              <icons.CaseSensitiveIcon className="size-4" />
            </Toggle>
            <Toggle size="xs" onPressedChange={(value) => setWholeWord(value)}>
              <icons.WholeWordIcon className="size-4" />
            </Toggle>
            <Toggle size="xs" onPressedChange={(value) => setRegexp(value)}>
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
