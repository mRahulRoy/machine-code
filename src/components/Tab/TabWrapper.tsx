"use client"
import React, { useState } from 'react'
import Tab from './Tab'
import Image from 'next/image';

const TabWrapper = () => {
    const [activeTab, setActiveTab] = useState(0);
    function handleTabchange(index: number) {
        setActiveTab(index);
    }
    return (
        <div className='min-w-[50vw] max-w-[50vw] mt-[100px]'>
            <Tab index={activeTab} onChange={handleTabchange}>
                <Tab.Headers>
                    <Tab.HeaderItem label="Button 1" index={0} />
                    <Tab.HeaderItem label="Button 2" index={1} />
                    <Tab.HeaderItem label="Button 3" index={2} />
                </Tab.Headers>
                <Tab.Content>
                    <Tab.ContentItem index={0}>
                        This is the first tab content and we made it very beautifully.
                        <Image
                            alt="car"
                            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                            width={800}
                            height={450}
                            className="w-full h-auto object-cover opacity-85"
                        />

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nihil recusandae ex aspernatur corrupti libero qui eum? Atque magni vel debitis officiis ducimus accusantium numquam sit nisi. Vel autem soluta quibusdam molestias iste laudantium nihil illum libero fuga, impedit maxime aut, aliquam qui, ut amet laborum doloribus harum. Nemo molestiae reiciendis repellendus facere aliquam nobis labore cumque amet, temporibus non natus perferendis repellat culpa esse suscipit! Delectus, autem id quis odio inventore accusantium recusandae consectetur minus corrupti excepturi odit, totam quisquam necessitatibus fugiat distinctio voluptatibus est, architecto eligendi qui? Enim corrupti, quos culpa voluptatum quas molestiae tenetur laudantium, perspiciatis fuga eveniet deleniti aliquam tempore, officia minima. Neque fugiat, maiores error rem corrupti aliquam nam reprehenderit dicta eum consequuntur iure, id qui deleniti, facilis adipisci aut quas voluptatum aliquid possimus unde dignissimos voluptate porro? Eveniet, deserunt quae, ut rem odit omnis, aperiam saepe eaque placeat consequatur perspiciatis consectetur ratione quaerat modi. Debitis deleniti ipsam fugit laudantium deserunt libero ratione, veniam sint autem assumenda illo repellat nostrum, fugiat quas corrupti sunt. Animi, natus praesentium voluptate illum amet, inventore, nulla maxime eaque dolore veritatis sint quibusdam tenetur maiores iure modi ab vitae et vero qui dicta optio molestiae nesciunt? Consequuntur officia enim mollitia.
                    </Tab.ContentItem>
                    <Tab.ContentItem index={1}>
                        This is the second tab content and we made it very beautifully.
                    </Tab.ContentItem>
                    <Tab.ContentItem index={2}>
                        This is the Third tab content and we made it very beautifully.
                    </Tab.ContentItem>
                </Tab.Content>
            </Tab>
        </div>
    )
}

export default TabWrapper