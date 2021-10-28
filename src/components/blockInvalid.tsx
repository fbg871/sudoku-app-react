import React, { useState } from 'react';


const blockInvalid = (e: { key: string; preventDefault: () => any; }) => ['e', 'E', '.', '-', '+'].includes(e.key) && e.preventDefault();

export default blockInvalid;