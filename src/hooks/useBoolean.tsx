import React, { useState } from 'react'

const useBoolean = () => {
    const [value, setValue] = useState<boolean>(false);
    function toggle() {
      setValue((val)=>!val);
    }
    return { value, toggle }
}

export default useBoolean