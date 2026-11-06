'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { SearchFilters } from '@/features/search';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';
import { Skeleton } from '@/shared/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { isEmptyForTab, useSearchPage } from '../../model/useSearchPage';
import { SEARCH_TABS_CONFIG } from '../search-tabs.config';

const SearchPage = () => {
  const { user, data, isLoading, activeTab, setActiveTab } = useSearchPage();

  return (
    <section className="grid min-h-screen grid-cols-[1fr_260px] max-lg:grid-cols-[1fr_160px] max-md:grid-cols-1">
      <section>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-fit w-full">
            {SEARCH_TABS_CONFIG.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="w-full py-2 font-semibold">
                {tab.content}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode={'wait'}>
            {SEARCH_TABS_CONFIG.map((tab) => {
              const isEmpty = isEmptyForTab(tab.value, data);
              if (tab.value !== activeTab) return null;

              return (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent key={tab.value} value={tab.value} className="px-5">
                    <div className="py-3">
                      {!isLoading ? (
                        data && tab.render(data, user)
                      ) : (
                        <ul className={'flex flex-col gap-4'}>
                          {Array.from({
                            length: 10,
                          }).map((_, i) => (
                            <li key={i}>
                              <Skeleton className="h-[240px] w-full" />
                            </li>
                          ))}
                        </ul>
                      )}
                      {isEmpty && (
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <Search />
                            </EmptyMedia>
                            <EmptyTitle>No results found</EmptyTitle>
                            <EmptyDescription>
                              Try a different keyword or adjust your filters to discover more
                              results.
                            </EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      )}
                    </div>
                  </TabsContent>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Tabs>
      </section>

      <SearchFilters />
    </section>
  );
};

export default SearchPage;
