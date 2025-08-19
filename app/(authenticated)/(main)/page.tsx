'use client';

import MenuBar from '@/components/menu-bar';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';

export default function Home() {
  return (
    <section className='flex w-full justify-between gap-10'>
      <div className='flex w-full flex-col gap-2'>
        {/* <div className='w-full min-w-0 border  space-y-5'> */}
        <Tabs
          aria-label='Options'
          classNames={{
            tabList:
              'w-full relative rounded-none p-0 border-b border-divider flex justify-between',
            cursor: 'w-full',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]',
          }}
          color='primary'
          variant='underlined'
        >
          <Tab key='for-you' title='For You'>
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key='following' title='Following'>
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key='communities' title='Communities'>
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        {/* <PostEditor />
        <Tabs defaultValue='for-you'>
          <TabsList>
            <TabsTrigger value='for-you'>For you</TabsTrigger>
            <TabsTrigger value='following'>Following</TabsTrigger>
          </TabsList>
          <TabsContent value='for-you'>
            <ForYouFeed />
          </TabsContent>
          <TabsContent value='following'>
            <FollowingFeed />
          </TabsContent>
        </Tabs> */}
        {/* </div> */}
        {/* <TrendsSidebar /> */}
      </div>
      <MenuBar className='sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80' />
    </section>
  );
}
